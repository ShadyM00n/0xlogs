const CreateLogConfig = {
    type: 'object',
    properties: {
      type: { type: 'string', default: 'info' },
      filePath: { type: 'string' },
      json: { type: 'boolean', default: true }
    },
    required: ['type'],
  };
  

  module.exports = { CreateLogConfig };