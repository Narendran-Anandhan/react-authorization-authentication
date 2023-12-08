mongoose = require('mongoose');

const Organization = require("../Models/organization");

exports.createOrganization = async (req, res) => {
    const org = new Organization({
        name: req.body.name,
        email: req.body.email,
        address: req.body.address
    });
    try {
        await org.save();
        res.status(201).json({
            status: 201,
            data: org,
            message: "Create successfully",
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            let errors = {};
      
            Object.keys(error.errors).forEach((key) => {
              errors[key] = error.errors[key].message;
            });
            res.status(400).send({
                status: 400,
                message: errors,
            });
          }
        res.status(500).send({
            status: 500,
            message: `Something wen't wrong`,
        });
    }
};

exports.getOrganization = async (req, res) => {
    try {
        const pageOptions = {
            page: parseInt(req.query.page, 10) || 0,
            limit: parseInt(req.query.limit, 10) || 10
        }
        let num = await Organization.find();
        let cnt = Object.keys(num).length;
        // Calculate the total number of pages
        const totalPages = Math.ceil(cnt / pageOptions.limit);

        await Organization.find().skip((pageOptions.page - 1) * pageOptions.limit).limit(pageOptions.limit)
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


exports.updateOrganization = async (req, res) => {
    const id = req.params.orgId;
    try {
        const id = req.params.orgId;
        const name = req.body.name;
        const email = req.body.email;
        const address = req.body.address;

        const org = await Organization.findById(id);
        if (!org) {
            return res.status(500).send({
                status: 500,
                message: `organization not found with id ${id}`,
            });
        }
        if (name) {
            org.name = name;
        }
        if (email) {
            org.email = email;
        }
        if (address) {
            org.address = address;
        }
        org.save();
        res.status(200).send({
            status: 200,
            data:org,
            message: "Update successfully",
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            let errors = {};
      
            Object.keys(error.errors).forEach((key) => {
              errors[key] = error.errors[key].message;
            });
      
            return res.status(400).send(errors);
          }
        res.status(500).send({
            status: 500,
            message: `Something wen't wrong`,
        });
    }
};

exports.deleteOrganization = async (req, res) => {
    const id = req.params.orgId;
    try {
        const org = await Organization.findByIdAndDelete(id);
        if (!org) {
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