

"use client";
import React, { useState, useEffect, useCallback } from "react";
import Accordion from "./Accordion";
import Profilecustomfile from "./Profilecustomfile";
import QuestionCounter from "./QuestionCounter";
import { saveQuestionsToDB } from "@/utils/postQuestions";
const About = () => {
  
  const [aboutQuestions, setAboutQuestions] = useState([{ question: "", answer: "", coverImage: null }]);
  const [audienceQuestions, setAudienceQuestions] = useState([{ question: "", answer: "", coverImage: null }]);
  const [brandQuestions, setBrandQuestions] = useState([{ question: "", answer: "", coverImage: null }]);

  const [openIndex, setOpenIndex] = useState(null);
  const [typingTimeout, setTypingTimeout] = useState(null);

  const debounceSave = useCallback((section, questions) => {
    console.log("deboucne func called")
    if (typingTimeout) clearTimeout(typingTimeout);
    
    const timeout = setTimeout(() => {
      saveQuestionsToDB(section, questions);
    }, 5000); // 5 seconds debounce

    setTypingTimeout(timeout);
  }, [typingTimeout]);

 

  const handleQuestionChange = (e, index, sectionKey) => {
    const newQuestions = [...(sectionKey === "about" ? aboutQuestions : sectionKey === "audience" ? audienceQuestions : brandQuestions)];
    newQuestions[index].question = e.target.value;
    updateSectionState(sectionKey, newQuestions);
    debounceSave(sectionKey, newQuestions);
  };

  const handleAnswerChange = (e, index, sectionKey) => {
    const newQuestions = [...(sectionKey === "about" ? aboutQuestions : sectionKey === "audience" ? audienceQuestions : brandQuestions)];
    newQuestions[index].answer = e.target.value;
    updateSectionState(sectionKey, newQuestions);
    debounceSave(sectionKey, newQuestions);
  };

  const handleCoverChange = (uploadedUrl, index, sectionKey) => {
    const newQuestions = [...(sectionKey === "about" ? aboutQuestions : sectionKey === "audience" ? audienceQuestions : brandQuestions)];
    newQuestions[index].coverImage = uploadedUrl;
    updateSectionState(sectionKey, newQuestions);
    debounceSave(sectionKey, newQuestions);
  };

  const addQuestion = (sectionKey) => {
    const newQuestions = [...(sectionKey === "about" ? aboutQuestions : sectionKey === "audience" ? audienceQuestions : brandQuestions), { question: "", answer: "", coverImage: null }];
    updateSectionState(sectionKey, newQuestions);
    debounceSave(sectionKey, newQuestions);
  };

  const removeQuestion = (index, sectionKey) => {
    const newQuestions = (sectionKey === "about" ? aboutQuestions : sectionKey === "audience" ? audienceQuestions : brandQuestions).filter((_, i) => i !== index);
    updateSectionState(sectionKey, newQuestions);
  };

  const updateSectionState = (sectionKey, newState) => {
    if (sectionKey === "about") setAboutQuestions(newState);
    if (sectionKey === "audience") setAudienceQuestions(newState);
    if (sectionKey === "brand") setBrandQuestions(newState);
  };

  const toggleAccordion = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleSelectQuestion = (question, index, sectionKey) => {
    const newQuestions = [...(sectionKey === "about" ? aboutQuestions : sectionKey === "audience" ? audienceQuestions : brandQuestions)];
    newQuestions[index].question = question;
    updateSectionState(sectionKey, newQuestions);
  };

  
  return (
    <div className="max-w-2xl mx-auto p-4 flex flex-col gap-10">
      {/* Accordion 1 – About You */}
      <Accordion title="About You*" isOpen={openIndex === 0} onToggle={() => toggleAccordion(0)}>
        <div className="text-gray-600 w-full overflow-y-auto h-[270px]" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {aboutQuestions.map((item, index) => (
            <div key={index} className="mb-4 p-2 rounded-md"  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <QuestionCounter
                label={`Question ${index + 1}`}
                value={item.question}
                onQuestionChange={(e) => handleQuestionChange(e, index, "about")}
                onAnswerChange={(e) => handleAnswerChange(e, index, "about")}
                maxLength={100}
                name={`aboutQuestion_${index}`}
                answerValue={item.answer}
                type="about"
                selectedQuestion={item.question} // Pass selected question
                onSelectQuestion={(question) => handleSelectQuestion(question, index, "about")} // Update parent state

              />
              <Profilecustomfile
                onFileChange={(uploadedUrl) => handleCoverChange(uploadedUrl, index, "about")}
                placeholder="Choose a cover picture"
                iconSrc="/assets/icons/onboarding/Upload.svg"
                label="Cover Picture"
                type="about"
              />
              {index > 0 && (
                <button onClick={() => removeQuestion(index, "about")} className="text-red-500 text-sm mt-2">
                  Remove Question
                </button>
              )}
            </div>
          ))}
          <div className="flex mt-2 cursor-pointer" onClick={() => addQuestion("about")}>
            <p className="font-qimano text-graphite">Add a new question</p>
            <div className="flex-1 ml-2 mt-2.5 border-t border-gray-200"></div>
          </div>
        </div>
      </Accordion>

      {/* Other Accordion sections would follow the same pattern */}
      <Accordion title="About Audience*" isOpen={openIndex === 1} onToggle={() => toggleAccordion(1)}>
        <div className="text-gray-600 w-full overflow-y-auto h-[270px]"  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {audienceQuestions.map((item, index) => (
            <div key={index} className="mb-4 p-2 rounded-md">
              <QuestionCounter
                label={`Question ${index + 1}`}
                value={item.question}
                onQuestionChange={(e) => handleQuestionChange(e, index, "audience")}
                onAnswerChange={(e) => handleAnswerChange(e, index, "audience")}
                maxLength={100}
                name={`audienceQuestion_${index}`}
                answerValue={item.answer}
                type="audience"
                selectedQuestion={item.question} // Pass selected question
                onSelectQuestion={(question) => handleSelectQuestion(question, index, "audience")} // Update parent state
              />
              <Profilecustomfile
                onFileChange={(uploadedUrl) => handleCoverChange(uploadedUrl, index, "audience")}
                placeholder="Choose a cover picture"
                iconSrc="/assets/icons/onboarding/Upload.svg"
                label="Cover Picture"
                type="audience"
              />
              {index > 0 && (
                <button onClick={() => removeQuestion(index, "audience")} className="text-red-500 text-sm mt-2">
                  Remove Question
                </button>
              )}
            </div>
          ))}
          <div className="flex mt-2 cursor-pointer" onClick={() => addQuestion("audience")}>
            <p className="font-qimano text-graphite">Add a new question</p>
            <div className="flex-1 ml-2 mt-2.5 border-t border-gray-200"></div>
          </div>
        </div>
      </Accordion>


       <Accordion title="Brand Connection*" isOpen={openIndex === 2} onToggle={() => toggleAccordion(2)}>
        <div className="text-gray-600 w-full overflow-y-auto h-[270px]"  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {brandQuestions.map((item, index) => (
            <div key={index} className="mb-4 p-2 rounded-md">
              <QuestionCounter
                label={`Question ${index + 1}`}
                value={item.question}
                onQuestionChange={(e) => handleQuestionChange(e, index, "brand")}
                onAnswerChange={(e) => handleAnswerChange(e, index, "brand")}
                selectedQuestion={item.question} // Pass selected question
                onSelectQuestion={(question) => handleSelectQuestion(question, index, "brand")}
                maxLength={100}
                name={`brandQuestion_${index}`}
                answerValue={item.answer}
                type="brand"
              />
              <Profilecustomfile
                onFileChange={(uploadedUrl) => handleCoverChange(uploadedUrl, index, "brand")}
                placeholder="Choose a cover picture"
                iconSrc="/assets/icons/onboarding/Upload.svg"
                label="Cover Picture"
                type="brand"
              />
              {index > 0 && (
                <button onClick={() => removeQuestion(index, "brand")} className="text-red-500 text-sm mt-2">
                  Remove Question
                </button>
              )}
            </div>
          ))}
          <div className="flex mt-2 cursor-pointer" onClick={() => addQuestion("brand")}>
            <p className="font-qimano text-graphite">Add a new question</p>
            <div className="flex-1 ml-2 mt-2.5 border-t border-gray-200"></div>
          </div>
        </div>
      </Accordion> 


    </div>
  );
};

export default About;

