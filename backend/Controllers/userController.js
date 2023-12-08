mongoose = require('mongoose');

const User = require("../Models/user");

const { GeneratePassword, ComparePassword } = require("../helper/jwt");


exports.createUser = async (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: await GeneratePassword(req.body.password),
        role: req.body.role
    });
    try {
        await user.save();
        res.status(201).json({
            status: 201,
            data: user,
            message: "Create successfully",
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            let errors = {};
      
            Object.keys(error.errors).forEach((key) => {
              errors[key] = error.errors[key].message;
            });
      
            return res.status(400).send(errors);
          }
        console.log(error);
        res.status(500).send({
            status: 500,
            message: `Something wen't wrong`,
        });
    }
};

exports.getUser = async (req, res) => {
    try {
        const pageOptions = {
            page: parseInt(req.query.page, 10) || 0,
            limit: parseInt(req.query.limit, 10) || 10
        }
        let num = await User.find();
        let cnt = Object.keys(num).length;
        // Calculate the total number of pages
        const totalPages = Math.ceil(cnt / pageOptions.limit);

        await User.find().skip((pageOptions.page - 1) * pageOptions.limit).limit(pageOptions.limit)
            .then((results) => {
                return res.status(200).send({
                    status: 200,
                    data: results,
                    count: totalPages
                });
            })
            .catch((err) => {
                res.status(500).send({
                    status: 500,
                    message: err,
                });
            });
    } catch (error) {
        res.status(500).send({
            status: 500,
            message: `Something wen't wrong`,
        });
    }
};


exports.updateUser = async (req, res) => {
    const id = req.params.userId;
    try {
        const id = req.params.userId;
        const username = req.body.username;
        const email = req.body.email;
        const role = req.body.role;

        const user = await User.findById(id);
        if (!user) {
            return res.status(500).send({
                status: 500,
                message: `user not found with id ${id}`,
            });
        }
        if (username) {
            user.username = username;
        }
        if (email) {
            user.email = email;
        }
        if (role) {
            user.role = role;
        }
        user.save();
        res.status(200).send({
            status: 200,
            data:user,
            message: "Update successfully",
        });
    } catch (error) {
        res.status(500).send({
            status: 500,
            message: `Something wen't wrong`,
        });
    }
};

exports.deleteUser = async (req, res) => {
    const id = req.params.userId;
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(500).send({
                status: 500,
                message: `user not found`,
            });
        }
        res.status(200).send({
            status: 200,
            message: "Delete successfully",
        });
    } catch (error) {
        res.status(500).send({
            status: 500,
            message: `Something wen't wrong`,
        });
    }
};