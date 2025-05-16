// tests/requestModel.test.js

const requestModel = require('../model/requestModel');
const db = require('../model/db');

jest.mock('../model/db', () => ({
  query: jest.fn(),
}));

describe('requestModel', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('setRequestFlags calls db.query with correct SQL and params', (done) => {
    const expectedSQL = `
     INSERT INTO requests (user_id, meal_plan_requested, exercise_suggestion_requested)
     VALUES (?, ?, ?)
     ON DUPLICATE KEY UPDATE
     meal_plan_requested = VALUES(meal_plan_requested),
     exercise_suggestion_requested = VALUES(exercise_suggestion_requested)
    `;

    db.query.mockImplementation((sql, params, callback) => {
      expect(sql.replace(/\s+/g, ' ').trim()).toBe(expectedSQL.replace(/\s+/g, ' ').trim());
      expect(params).toEqual([7, 1, 0]);
      callback(null, { affectedRows: 1 });
    });

    requestModel.setRequestFlags(7, 1, 0, (err, result) => {
      expect(err).toBeNull();
      expect(result).toEqual({ affectedRows: 1 });
      expect(db.query).toHaveBeenCalledTimes(1);
      done();
    });
  });

  test('getRequestFlags calls db.query with correct SQL and params', (done) => {
    db.query.mockImplementation((sql, params, callback) => {
      expect(sql).toBe('SELECT * FROM requests WHERE user_id = ?');
      expect(params).toEqual([7]);
      callback(null, [{ user_id: 7, meal_plan_requested: 1, exercise_suggestion_requested: 0 }]);
    });

    requestModel.getRequestFlags(7, (err, result) => {
      expect(err).toBeNull();
      expect(result).toEqual([{ user_id: 7, meal_plan_requested: 1, exercise_suggestion_requested: 0 }]);
      expect(db.query).toHaveBeenCalledTimes(1);
      done();
    });
  });

  test('setRequestFlags handles db error', (done) => {
    db.query.mockImplementation((sql, params, callback) => {
      callback(new Error('DB failure'), null);
    });

    requestModel.setRequestFlags(7, 1, 0, (err, result) => {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toBe('DB failure');
      expect(result).toBeNull();
      done();
    });
  });
});





//command to run the unit tests togather//

//npx jest tests/feedbackModel.test.js tests/requestModel.test.js//