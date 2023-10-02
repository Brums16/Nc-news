const request = require("supertest");
const data = require("../db/data/test-data");
const { app } = require("../app.js");
const seed = require("../db/seeds/seed");
const db = require("../db/connection");
const expectedEndpoint = require("../endpoints.json");

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
        expect(endpoints).toEqual(expectedEndpoint);
      });
  });
});

describe("GET /api/articles/:articleid", () => {
  test("responds with status code 200", () => {
    return request(app).get("/api/articles/6").expect(200);
  });
  test("responds with an article object", () => {
    return request(app)
      .get("/api/articles/5")
      .then(({ body }) => {
        expect(typeof body).toBe("object");
      });
  });
  test("responds with an article object with the correct properties", () => {
    return request(app)
      .get("/api/articles/2")
      .then(({ body }) => {
        expect(body.article.hasOwnProperty("title")).toBe(true);
        expect(body.article.hasOwnProperty("article_id")).toBe(true);
        expect(body.article.hasOwnProperty("body")).toBe(true);
        expect(body.article.hasOwnProperty("topic")).toBe(true);
        expect(body.article.hasOwnProperty("created_at")).toBe(true);
        expect(body.article.hasOwnProperty("votes")).toBe(true);
        expect(body.article.hasOwnProperty("article_img_url")).toBe(true);
      });
  });
  test("responds with the correct article object", () => {
    const expected = {
      article_id: 7,
      article_img_url:
        "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
      author: "icellusedkars",
      body: "I was hungry.",
      created_at: "2020-01-07T14:08:00.000Z",
      title: "Z",
      topic: "mitch",
      votes: 0,
    };
    return request(app)
      .get("/api/articles/7")
      .then(({ body }) => {
        expect(body.article).toEqual(expected);
      });
  });
  test("responds with a 404 code when passed an invalid article id", () => {
    return request(app).get("/api/articles/50").expect(404);
  });
  test("responds with appropriate error message when passed invalid article id", () => {
    return request(app)
      .get("/api/articles/50")
      .then(({ text }) => {
        expect(text).toBe("No user found for user_id: 50");
      });
  });
});
