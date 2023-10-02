const request = require("supertest");
const data = require("../db/data/test-data");
const { app } = require("../app.js");
const seed = require("../db/seeds/seed");
const db = require("../db/connection");
const { fetchEndpoints } = require("../models/topics-model");

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("GET /api/topics", () => {
  test("responds with status code 200", () => {
    return request(app).get("/api/topics").expect(200);
  });
  test("responds with an array of topic objects with a slug property and description property", () => {
    return request(app)
      .get("/api/topics")
      .then((response) => {
        const { topics } = response.body;
        expect(topics.every((topic) => topic.hasOwnProperty("slug"))).toBe(
          true
        );
        expect(
          topics.every((topic) => topic.hasOwnProperty("description"))
        ).toBe(true);
      });
  });
  test("responds with a correct array of topic objects", () => {
    return request(app)
      .get("/api/topics")
      .then((response) => {
        const { topics } = response.body;
        const expected = [
          { slug: "mitch", description: "The man, the Mitch, the legend" },
          { slug: "cats", description: "Not dogs" },
          { slug: "paper", description: "what books are made of" },
        ];
        expect(topics).toEqual(expected);
      });
  });
});

describe("GET /api", () => {
  test("responds with status code 200", () => {
    return request(app).get("/api").expect(200);
  });
  test("responds with an object", () => {
    return request(app)
      .get("/api")
      .then((response) => {
        expect(typeof response).toBe("object");
      });
  });
  test("responds with an object containing a property for each request", () => {
    return request(app)
      .get("/api")
      .then((response) => {
        const { endpoints } = response.body;
        expect(endpoints.hasOwnProperty("GET /api")).toBe(true);
        expect(endpoints.hasOwnProperty("GET /api/topics")).toBe(true);
        expect(endpoints.hasOwnProperty("GET /api/articles")).toBe(true);
      });
  });
  test("responds with a correct object containing the endpoint objects", () => {
    return request(app)
      .get("/api")
      .then((response) => {
        const { endpoints } = response.body;
        const expected = {
          "GET /api": {
            description:
              "serves up a json representation of all the available endpoints of the api",
            requestFormat: null,
          },
          "GET /api/topics": {
            description: "serves an array of all topics",
            queries: [],
            exampleResponse: {
              topics: [{ slug: "football", description: "Footie!" }],
            },
            requestFormat: null,
          },
          "GET /api/articles": {
            description: "serves an array of all articles",
            queries: ["author", "topic", "sort_by", "order"],
            exampleResponse: {
              articles: [
                {
                  title: "Seafood substitutions are increasing",
                  topic: "cooking",
                  author: "weegembump",
                  body: "Text from the article..",
                  created_at: "2018-05-30T15:59:13.341Z",
                  votes: 0,
                  comment_count: 6,
                },
              ],
            },
            requestFormat: null,
          },
        };

        expect(endpoints).toEqual(expected);
      });
  });
});
