export const languages = [
    {
        name: "javascript",
        version: "18.15.0",
        snippet: `\nfunction greet(name) {\n\tconsole.log("Hello, " + name + "!");\n}\n\ngreet("Alex");\n`
    },
    {
        name: "typescript",
        version: "5.0.3",
        snippet: `\ntype Params = {\n\tname: string;\n}\n\nfunction greet(data: Params) {\n\tconsole.log("Hello, " + data.name + "!");\n}\n\ngreet({ name: "Alex" });\n`
    },
    {
        name: "python",
        version: "3.10.0",
        snippet: `\ndef greet(name):\n\tprint("Hello, " + name + "!")\n\ngreet("Alex")\n`
    },
    {
        name: "java",
        version: "15.0.2",
        snippet: `\npublic class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World");\n\t}\n}\n`
    },
    {
        name: "csharp",
        version: "6.12.0",
        snippet: `using System;\n\nnamespace HelloWorld\n{\n\tclass Hello { \n\t\tstatic void Main(string[] args) {\n\t\t\tConsole.WriteLine("Hello World in C#");\n\t\t}\n\t}\n}\n`
    },
    {
        name: "php",
        version: "8.2.3",
        snippet: `<?php\n\n$name = 'Alex';\necho $name;\n`
    }
]as const;

export type Language = typeof languages[number];
