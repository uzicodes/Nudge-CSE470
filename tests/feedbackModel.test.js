// tests/feedbackModel.test.js

const feedbackModel = require('../model/feedbackModel');
const db = require('../model/db');

jest.mock('../model/db', () => ({
  query: jest.fn(),
}));

describe('feedbackModel', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('submitFeedback calls db.query with correct SQL and params', (done) => {
    db.query.mockImplementation((sql, params, callback) => {
      expect(sql).toBe('INSERT INTO feedback (user_id, msg) VALUES (?, ?)');
      expect(params).toEqual([5, 'Great feedback']);
      callback(null, { affectedRows: 1 }); 
    });

    feedbackModel.submitFeedback(5, 'Great feedback', (err, result) => {
      expect(err).toBeNull();
      expect(result).toEqual({ affectedRows: 1 });
      expect(db.query).toHaveBeenCalledTimes(1);
      done();
    });
  });

  test('getAllFeedback calls db.query with correct SQL', (done) => {
    db.query.mockImplementation((sql, callback) => {
      expect(sql).toBe('SELECT * FROM feedback ORDER BY created_at DESC');
      callback(null, [{ id: 1, message: 'Test' }]);
    });

    feedbackModel.getAllFeedback((err, result) => {
      expect(err).toBeNull();
      expect(result).toEqual([{ id: 1, message: 'Test' }]);
      expect(db.query).toHaveBeenCalledTimes(1);
      done();
    });
  });

  test('deleteFeedback calls db.query with correct SQL and params', (done) => {
    db.query.mockImplementation((sql, params, callback) => {
      expect(sql).toBe('DELETE FROM feedback WHERE id = ?');
      expect(params).toEqual([10]);
      callback(null, { affectedRows: 1 });
    });

    feedbackModel.deleteFeedback(10, (err, result) => {
      expect(err).toBeNull();
      expect(result).toEqual({ affectedRows: 1 });
      expect(db.query).toHaveBeenCalledTimes(1);
      done();
    });
  });

  test('submitFeedback handles db error', (done) => {
    db.query.mockImplementation((sql, params, callback) => {
      callback(new Error('DB error'), null);
    });

    feedbackModel.submitFeedback(5, 'Fail message', (err, result) => {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toBe('DB error');
      expect(result).toBeNull();
      done();
    });
  });
});








//command to run the unit tests togather//

//npx jest tests/feedbackModel.test.js tests/requestModel.test.js//