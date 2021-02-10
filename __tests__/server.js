const { expect } = require('@jest/globals');
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const supertest = require("supertest");
const server = require("../src/server");

dotenv.config();

jest.setTimeout(30000);

test("POST / returns a collection of records", async (done) => {
    await supertest(server).post("/")
        .send({
            startDate: "2017-01-01",
            endDate: "2017-12-31",
            minCount: 0,
            maxCount: 500
        })
        .expect(200)
        .then((response) => {
            const { code, msg, records } = response.body;

            // check code and msg
            expect(code).toBe(0);
            expect(msg).toBe('Success');

            // check type and length of records
            expect(Array.isArray(records)).toBeTruthy();
            expect(records.length).toEqual(3);
    
            // Check records items
            expect(records[0].key).not.toBeUndefined();
            expect(records[0].createdAt).not.toBeUndefined();
            expect(records[0].totalCount).not.toBeUndefined();
        });

    done();
});

test("POST / returns a collection of records filtered by minCount and maxCount", async (done) => {
    await supertest(server).post("/")
        .send({
            startDate: "2017-01-01",
            endDate: "2017-12-31",
            minCount: 170,
            maxCount: 300
        })
        .expect(200)
        .then((response) => {
            const { code, msg, records } = response.body;

            // check code and msg
            expect(code).toBe(0);
            expect(msg).toBe('Success');

            // now only 1 record is returned
            expect(Array.isArray(records)).toBeTruthy();
            expect(records.length).toEqual(1);
        });

    done();
});

afterAll((done) => {
    mongoose.connection.close(() => done())
});
