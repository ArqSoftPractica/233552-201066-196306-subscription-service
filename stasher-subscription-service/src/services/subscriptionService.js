const SubscribedUserRepository = require("../repositories/subscribedUserRepository");
const createLogger = require("../logger/log");
const nodemailer = require("nodemailer");

module.exports = class SubscriptionService {

    constructor() {        
        this.subscribedUserRepository = new SubscribedUserRepository();
    }

    async addSubscribedUser(data) {
        return await this.subscribedUserRepository.addSubscribedUser(data);
    }

    async deleteSubscribedUser(email,category) {
        return await this.subscribedUserRepository.deleteSubscribedUser(email,category);
    }

    async getAllSubscribedUsers() {
        return await this.subscribedUserRepository.getAllSubscribedUser();
    }

    async sendEmail(category,message) {
        try {
        let users = await this.getAllSubscribedUsers()
        users.forEach(subscribedUser => {
            if(subscribedUser.dataValues.categoryName==category.split('"')[0]){
                 var mailOptions = {
                    from: "obligatorioarqusoft@gmail.com",
                    to: subscribedUser.dataValues.emailAddress,
                    subject: 'Stasher notification',
                    text: message.split('"')[1] 
                };
                nodemailer.createTransport({
                    service: "gmail",
                    host: 'smtp.gmail.com ',
                    port: 465,
                    secure: true,
                    auth: {
                        user: "obligatorioarqusoft@gmail.com",
                        pass: "tvdtuvdrcpmukwbh"
                    }
                }).sendMail(mailOptions, function (error, info) {
                    if (error) {
                        throw new Error(error.message);
                    } else {
                        message = 'E-mail send:' + info.response;              
                    }
                
                });
            }            
        });     
        } catch (err) {
            createLogger.error(
                ` Error ocurred: 401 ${err.message}`
            );     
        }
    }

}