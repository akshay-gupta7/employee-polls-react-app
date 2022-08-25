import {
    _getUsers,
    _getQuestions,
    _saveQuestion,
    _saveQuestionAnswer,
  } from '../util/_DATA';

//This testing file contains tests for functions in Data.js from utils.

    describe("_getQuestions", () => {
        it("will return the correct number of questions from getQuestions function", async () => {
            var result = await _getQuestions();
            expect(result).not.toBeNull;
            expect(Object.keys(result).length).toEqual(6);
        });
});

    describe("_getUsers", () => {
        it("will return the correct number of users from getUsers function", async () => {
            var result = await _getUsers();
            expect(result).not.toBeNull;
            expect(Object.keys(result).length).toEqual(4);
        });
    });

    describe("_saveQuestion", () => {
        it("will return the saved question when the correct paramenters are received in SaveQuestion function", async () => {
            var question = {
            author: "sarahedo",
            optionOneText: "Option One Test",
            optionTwoText: "Option Two Test",
            };
            var result = await _saveQuestion(question);
            expect(result.id).not.toBeNull();
            expect(result.author).toBe(question.author);
            expect(result.timestamp).not.toBeNull();
            expect(result.optionOne.text).toBe(question.optionOneText);
            expect(result.optionTwo.text).toBe(question.optionTwoText);
            expect(result.optionOne.votes).toEqual([]);
            expect(result.optionTwo.votes).toEqual([]);
    });

    it("will return an error if incorrect data is passed to the saveQuestion function", async () => {
        var question = {
        author: null,
        };
        await expect(_saveQuestion(question)).rejects.toEqual(
        "Please provide optionOneText, optionTwoText, and author"
        );
    });
    });

    describe("_saveQuestionAnswer", () => {
        it("will return true when correct data is passed to the save QuestioAnswer function", async () => {
            var questionAnswer = {
            authedUser: "sarahedo",
            qid: "8xf0y6ziyjabvozdd253nd",
            answer: "optionTwo",
            };
            await expect(_saveQuestionAnswer(questionAnswer)).resolves.toBe(true);
    });

        it("will return an error if erroneous data is passed to the saveQuestionAnswer function", async () => {
            var questionAnswer = {
            qid: null,
            answer: "option1",
            };
            await expect(_saveQuestionAnswer(questionAnswer)).rejects.toEqual(
            "Please provide authedUser, qid, and answer"
            );
        });
    });