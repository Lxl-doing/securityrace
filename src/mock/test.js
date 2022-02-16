import Mock from "mockjs";

Mock.mock("/test", "get", {
    "titles|9-9": [
        {
            content: "1. OSI框架是对OSI安全体系结构的扩展（判断题）",
            type: "single",
            selectLists: ["A. 正确", "B. 错误"],
        },
        {
            content: "2. OSI框架不是对OSI安全体系结构的扩展（判断题）",
            type: "single",
            selectLists: ["A. 正确", "B. 错误"],
        },
        {
            content:
                "3. 下面哪一个不是IATF的保护信息系统的通用框架的内容？（单选题）",
            type: "single",
            selectLists: [
                "A. 本地计算环境",
                "B. 区域边界",
                "C. 辅助性基础设施",
                "D. 公共网络",
            ],
        },
        {
            content: "4. 下面哪些是OSI安全框架的内容？（多选题）",
            type: "multiple",
            selectLists: [
                "A. 认证框架",
                "B. 访问控制框架",
                "C. 确认框架",
                "D. 机密性框架",
                "E. 非否认框架",
            ],
        },
        {
            content: "5. 本地计算环境不包括服务器（判断题）",
            type: "single",
            selectLists: ["A. 正确", "B. 错误"],
        },
        {
            content: "6. 区域边界是信息进入或离开区域或机构的点（判断题）",
            type: "single",
            selectLists: ["A. 正确", "B. 错误"],
        },
    ],
})