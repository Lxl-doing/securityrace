import Mock from "mockjs";

Mock.mock("/testCode", "get", /[A-Z0-9]{4}/)