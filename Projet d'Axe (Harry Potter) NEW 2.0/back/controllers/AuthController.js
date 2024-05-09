import express from 'express'
import bcrypt from 'bcrypt'
import { prisma } from '../config/prisma.js'
import jwt from 'jsonwebtoken'

const signUp = async (req, res) => {
    const { email, pseudo, password } = req.body

    const hashedPassword = await bcrypt.hash(password, 10)

    prisma.user
        .create({
            data: {
                email,
                pseudo,
                password: hashedPassword,
            },
        })
        .then((user) => {
            res.json(user)
            })
        .catch((error) => {
            res.json(error)
        })
}

const logIn = async (req, res) => {
    const { email, password } = req.body

    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    })

    if (!user) {
        return res.status(404).json({ error: 'User not found' })
    }

    const validPassword = await bcrypt.compare(password, user.password)

    if (!validPassword) {
        return res.status(404).json({ error: 'Password not valid' })
    }

    const token = jwt.sign({ id: user.id, email: user.email}, process.env.JWT_SECRET, {
        expiresIn: '2h',
    })

    res.json({ token })
}

export {
    signUp,
    logIn
}