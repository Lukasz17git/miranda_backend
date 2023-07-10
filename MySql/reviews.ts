import generateError from "../Errors/generateError"
import { ReviewType } from "../Models/reviews"
import { generateMySqlCreationKeys, generateMySqlUpdateKeys } from "../Utils/mySqlUtils"
import { commandDB, queryDB } from "./connection"

export const createReviewsTable = async () => {
   try {
      await queryDB('db_initialization', `
      CREATE TABLE IF NOT EXISTS reviews (
        id VARCHAR(36) PRIMARY KEY,
        sentAt VARCHAR(29) NOT NULL,
        viewed BOOLEAN DEFAULT false,
        archived BOOLEAN DEFAULT false,
        subject ENUM('Subject A', 'Subject B', 'Subject C') DEFAULT 'Subject A',
        comment TEXT NOT NULL,
        personName VARCHAR(255),
        personLastname VARCHAR(255),
        personEmail VARCHAR(255),
        personPhone VARCHAR(255)
      );
    `)
   } catch (error) {
      console.log('error creating reviews table')
   }
}

export const getReviewsFromDB = async () => {
   const rows = await queryDB<ReviewType>('review', `SELECT * FROM reviews`)
   return rows
}

export const getReviewByIdInDB = async (id: string) => {
   const rows = await queryDB<ReviewType>('review', `SELECT * FROM reviews WHERE id = ?`, [id])
   return rows[0]
}

export const createReviewInDB = async (review: ReviewType) => {
   const keys = Object.keys(review);
   const values = Object.values(review);
   const { sqlKeys, sqlValues } = generateMySqlCreationKeys(keys);
   await commandDB('review', `INSERT INTO reviews ${sqlKeys} VALUES ${sqlValues}`, values);
}

export const updateReviewInDB = async (reviewID: string, review: Partial<ReviewType>) => {
   const keys = Object.keys(review);
   const values = Object.values(review);
   const { sqlKeyValue } = generateMySqlUpdateKeys(keys);
   await commandDB('review', `UPDATE reviews SET ${sqlKeyValue} WHERE id = ?`, [...values, reviewID]);
}

export const deleteReviewInDB = async (reviewID: string) => {
   console.log(reviewID, 'deleting review');
   const rows = await commandDB('review', `DELETE FROM reviews WHERE id = ?`, [reviewID]);
   if (rows.affectedRows === 0) throw generateError('database', 'review', 'nonexistent');
   console.log('rows', rows);
}
