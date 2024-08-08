import config from "../config/config.js";
import { Client, Account, ID } from "appwrite";

export class AuthService{
    client=new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.account=new Account(this.client)
    }
    async createAccount({email,password,name}){
        try {
            const userAccount=await this.account.create(ID.unique(),email,password,name)
            if(userAccount){
                // either call login function and let user login 
                // or, redirect to login page for the login and enter

            }
            else{
                return userAccount
            }
        } catch (error) {
            throw error;
        }
    }
    async login({email,password}){
        try {
            return await this.account.createEmailPasswordSession(email,password)
        } catch (error) {
            throw error;
        }
    }
    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite Server:: GetCurrent User:: error",error)
        }
        return null;
    }
    async logout(){
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite Server:: Logout User:: error",error)
        }
    }
}

const authService=new AuthService();
export default authService;