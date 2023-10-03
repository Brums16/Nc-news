const request = require("supertest");
const data = require("../db/data/test-data");
const { app } = require("../app.js");
const seed = require("../db/seeds/seed");
const db = require("../db/connection");
const expectedEndpoint = require("../endpoints.json");
require("jest-sorted");

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
  test("responds with the correct article object", () => {
    return request(app)
      .get("/api/articles/7")
      .then(({ body }) => {
        expect(body.article.title).toBe("Z");
        expect(body.article.article_id).toBe(7);
        expect(body.article.body).toBe("I was hungry.");
        expect(body.article.topic).toBe("mitch");
        expect(body.article.created_at).toBe("2020-01-07T14:08:00.000Z");
        expect(body.article.votes).toBe(0);
        expect(body.article.article_img_url).toBe(
          "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"
        );
      });
  });
  test("responds with a 404 code when passed an invalid article id", () => {
    return request(app).get("/api/articles/50").expect(404);
  });
  test("responds with appropriate error message when passed invalid article id", () => {
    return request(app)
      .get("/api/articles/50")
      .then(({ text }) => {
        expect(text).toBe("No article found for article_id: 50");
      });
  });
});

describe("GET /api/articles", () => {
  test("responds with status code 200", () => {
    return request(app).get("/api/articles").expect(200);
  });

  test("responds with an articles array", () => {
    return request(app)
      .get("/api/articles")
      .then(({ body }) => {
        expect(Array.isArray(body.articles)).toBe(true);
      });
  });
  test("responds with an articles array of objects containing the correct properties", () => {
    return request(app)
      .get("/api/articles")
      .then(({ body }) => {
        const articlesArray = body.articles;
        expect(
          articlesArray.every((article) => article.hasOwnProperty("author"))
        ).toBe(true);
        expect(
          articlesArray.every((article) => article.hasOwnProperty("title"))
        ).toBe(true);
        expect(
          articlesArray.every((article) => article.hasOwnProperty("article_id"))
        ).toBe(true);
        expect(
          articlesArray.every((article) => article.hasOwnProperty("topic"))
        ).toBe(true);
        expect(
          articlesArray.every((article) => article.hasOwnProperty("created_at"))
        ).toBe(true);
        expect(
          articlesArray.every((article) => article.hasOwnProperty("votes"))
        ).toBe(true);
        expect(
          articlesArray.every((article) =>
            article.hasOwnProperty("article_img_url")
          )
        ).toBe(true);
        expect(
          articlesArray.every((article) =>
            article.hasOwnProperty("comment_count")
          )
        ).toBe(true);
        expect(
          articlesArray.every((article) => article.hasOwnProperty("body"))
        ).toBe(false);
      });
  });
  test("responds with an articles array of objects sorted by date created", () => {
    return request(app)
      .get("/api/articles")
      .then(({ body }) => {
        expect(body.articles).toBeSortedBy("created_at", { descending: true });
      });
  });
  test("comment count property correctly calculates number of comments for each article", () => {
    return request(app)
      .get("/api/articles")
      .then(({ body }) => {
        expect(body.articles[6].comment_count).toBe(11);
        expect(body.articles[0].comment_count).toBe(2);
      });
  });
});

describe("GET /api/articles/:articleid/comments", () => {
  test("responds with status code 200", () => {
    return request(app).get("/api/articles/9/comments").expect(200);
  });
  test("responds with an array", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .then(({ body }) => {
        expect(Array.isArray(body.comments)).toBe(true);
      });
  });
  test("responds with an array of comment objects containing the correct properties", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .then(({ body }) => {
        console.log(body, "body in the test");
        const commentsArray = body.comments;
        expect(
          commentsArray.every((comment) => comment.hasOwnProperty("author"))
        ).toBe(true);
        expect(
          commentsArray.every((comment) => comment.hasOwnProperty("comment_id"))
        ).toBe(true);
        expect(
          commentsArray.every((comment) => comment.hasOwnProperty("body"))
        ).toBe(true);
        expect(
          commentsArray.every((comment) => comment.hasOwnProperty("created_at"))
        ).toBe(true);
        expect(
          commentsArray.every((comment) => comment.hasOwnProperty("votes"))
        ).toBe(true);
        expect(
          commentsArray.every((comment) => comment.hasOwnProperty("article_id"))
        ).toBe(true);
      });
  });
  test("responds with the correct array of comment objects for a given article", () => {
    return request(app)
      .get("/api/articles/5/comments")
      .then(({ body }) => {
        expect(body.comments).toEqual([
          {
            comment_id: 14,
            body: "What do you see? I have no idea where this will lead us. This place I speak of, is known as the Black Lodge.",
            votes: 16,
            author: "icellusedkars",
            article_id: 5,
            created_at: "2020-06-09T05:00:00.000Z",
          },
          {
            comment_id: 15,
            body: "I am 100% sure that we're not completely sure.",
            votes: 1,
            author: "butter_bridge",
            article_id: 5,
            created_at: "2020-11-24T00:08:00.000Z",
          },
        ]);
      });
  });
  test("responds with a 404 code when passed an invalid article id", () => {
    return request(app).get("/api/articles/50/comments").expect(404);
  });
  test("responds with appropriate error message when passed invalid article id", () => {
    return request(app)
      .get("/api/articles/50/comments")
      .then(({ text }) => {
        expect(text).toBe("No article found for article_id 50");
      });
  });
  test("responds with a 404 code when passed an article id for an article with no comments", () => {
    return request(app).get("/api/articles/8/comments").expect(404);
  });
  test("responds with appropriate error message when passed a valid article id with no comments", () => {
    return request(app)
      .get("/api/articles/8/comments")
      .then(({ text }) => {
        expect(text).toBe("No comments found for article_id 8");
      });
  });
});
