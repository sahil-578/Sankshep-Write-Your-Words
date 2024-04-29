/* eslint-disable no-unreachable */
/* eslint-disable no-unused-vars */
import conf from '../conf/conf'
import {Client, ID, Databases, Storage, Query} from 'appwrite'

export class Service{

    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);

    }

    
    async createPost({Title, Slug, Content, featuredImage, Status, userId}) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                Slug,
                {
                    Title,
                    Content,
                    featuredImage,
                    Status,
                    userId
                }

            )
        } catch (error) {
            console.log("Appwrite Service :: createPost :: error", error);
        }
    }


    async updatePost(Slug, {Title, Content, featuredImage, Status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                Slug,
                {
                    Title, 
                    Content, 
                    featuredImage,
                    Status, 
                }
            
            )

        } catch (error) {
            console.log("Appwrite Service :: updatePost :: error", error);
        }
    }


    async deletePost(Slug, {Title, Content, featuredImage, Status}){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                Slug,

            )

            return true;

        } catch (error) {
            console.log("Appwrite Service :: deletePost :: error", error);
            return false;
        }
    }


    async getPost(Slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                Slug,
            )        
        } catch (error) {
            console.log("Appwrite Service :: getPost :: error", error);
            return false;
        }
    }


    async getAllPosts(queries = [Query.equal('status', 'active')]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            )
        } catch (error) {
            console.log("Appwrite Service :: getAllPosts :: error", error);
            return false;
        }
    }


    // file upload services


    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite Service :: uploadFile :: error", error);
            return false;
        }
    }


    async deleteFile(fileId){
        try {
            return await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log("Appwrite Service :: deleteFile :: error", error);
            return false;
        }
    }


    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}


const service = new Service()

export default service 