define({ "api": [
  {
    "type": "post",
    "url": "/call/count",
    "title": "Get apdex from NewRelic",
    "version": "1.0.0",
    "group": "Monitoring",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Error\n{\n  \"status\": \"error\",\n  \"message\": \"...\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/call.js",
    "groupTitle": "Monitoring",
    "name": "PostCallCount"
  },
  {
    "type": "post",
    "url": "/call/responseTime",
    "title": "Get average response time from NewRelic",
    "version": "1.0.0",
    "group": "Monitoring",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Error\n{\n  \"status\": \"error\",\n  \"message\": \"...\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/call.js",
    "groupTitle": "Monitoring",
    "name": "PostCallResponsetime"
  }
] });
