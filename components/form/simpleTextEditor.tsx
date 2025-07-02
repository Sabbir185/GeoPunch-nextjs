'use client';

import {Form} from 'antd';
import React from 'react';
import {
    BtnBold,
    BtnBulletList,
    BtnClearFormatting,
    BtnItalic,
    BtnLink,
    BtnNumberedList,
    BtnRedo,
    BtnStrikeThrough,
    BtnStyles,
    BtnUnderline,
    BtnUndo,
    createButton,
    Editor,
    EditorProvider,
    HtmlButton,
    Separator,
    Toolbar
} from 'react-simple-wysiwyg';
import {Label} from '../ui/label';

interface SimpleTextEditorProps {
    value?: string;
    label?: string;
    name?: string;
    height?: string;
    required?: boolean;
    placeholder?: string;
    onChange?: (value: string) => void;
}

const BtnAlignCenter = createButton('Align center', '≡', 'justifyCenter');

const SimpleTextEditor: React.FC<SimpleTextEditorProps> = ({
                                                               value = "",
                                                               name,
                                                               label,
                                                               height,
                                                               required = false,
                                                               placeholder = '',
                                                               onChange
                                                           }) => {
    const handleEditorChange = (content: string) => {
        if (onChange) {
            onChange(content);
        }
    };

    return (
        <EditorProvider>
            <div className="space-y-2">
                {label && (
                    <Label className="block text-sm font-medium text-gray-700">
                        {label}
                        {required && <span className="text-red-500 ml-1">*</span>}
                    </Label>
                )}
                <Form.Item name={name} noStyle>
                    <Editor
                        value={value}
                        placeholder={placeholder}
                        onChange={(e) => handleEditorChange(e.target.value)}
                        style={{
                            minHeight: height ? height : '250px',
                            width: '100%',
                            maxWidth: '100%',
                            minWidth: '0',
                            boxSizing: 'border-box',
                        }}
                    >
                        <Toolbar>
                            <BtnUndo/>
                            <BtnRedo/>
                            <Separator/>
                            <BtnBold/>
                            <BtnItalic/>
                            <BtnUnderline/>
                            <BtnStrikeThrough/>
                            <BtnAlignCenter/>
                            <Separator/>
                            <BtnNumberedList/>
                            <BtnBulletList/>
                            <Separator/>
                            <BtnLink/>
                            <BtnClearFormatting/>
                            <HtmlButton/>
                            <Separator/>
                            <BtnStyles/>
                        </Toolbar>
                    </Editor>
                </Form.Item>
            </div>
        </EditorProvider>
    );
};

export default SimpleTextEditor;
