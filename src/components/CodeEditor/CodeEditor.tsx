"use client"

import { useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import * as React from "react"
import { Button } from "@/components/ui/button";
import { executeCode } from "@/helpers/api";
import { languages } from "@/constants/languages";
import { Select, SelectContent, SelectItem, SelectLabel, SelectTrigger, SelectValue, } from "@/components/ui/select"

const CodeEditor = () => {
    const editorRef = useRef();
    const [code, setcode] = useState()
    const [language, setLanguage] = useState(
        {
            name: languages[0].name,
            version: languages[0].version,
            snippet: languages[0].snippet
        }
    );

    const onMount = (editor: any) => {
        editorRef.current = editor;
        editor.focus();
    };


    return (
        <div>
            <div className="flex gap-12">
                <Select onValueChange={(e: any) => {setLanguage(e)}}>
                    <SelectTrigger className="w-[280px]">
                        <SelectValue placeholder="Select the language" />
                    </SelectTrigger>
                    <SelectContent>
                        {languages?.map((lang: any) => {
                            return (
                                <SelectItem value={lang} key={lang}>
                                    {lang.name} ({lang.version})
                                </SelectItem>
                            )
                        })}
                    </SelectContent>
                </Select>

                <Button
                    onClick={async () => {
                        const res = await executeCode(language, code);
                        console.log("RESULT --> ", res)
                    }}>Run code</Button>
            </div>

            <div>
                <Editor
                    options={{
                        minimap: {
                            enabled: false,
                        },
                    }}
                    height="75vh"
                    width="60vw"
                    theme="vs-dark"
                    defaultLanguage={language.name}
                    language={language.name}
                    defaultValue={language.snippet}
                    value={language.snippet}
                    loading={<>HELOOOOOO</>}
                    onMount={onMount}
                    onChange={(e: any) => setcode(e)}
                />
            </div>
        </div>
    );
};
export default CodeEditor;
