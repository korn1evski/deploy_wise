import './card_help.css'
import {useState} from 'react';

export default function CardHelp (props) {
    const [click,setClick] = useState(false);
    const buttonClick = () => {
        setClick(!click);
    }
    const copyToClipboard = () => {
        // const combinedContent = `Idea:\n${props.text}\nTags:\n ${props.tags.map((e) => `${e.tag}` + ",").join(' ')}`;
        const tags = props.tags.map(tag => tag.trim()).join(', '); // Trim each tag and join with a comma
        const combinedContent = `Idea:\n${props.text}\nTags:\n${tags}`; // Combine the text and tags
        const tempTextArea = document.createElement('textarea');
        tempTextArea.value = combinedContent;
        document.body.appendChild(tempTextArea);
    
        // Copying to the clipboard
        navigator.clipboard.writeText(tempTextArea.value);
    
        document.body.removeChild(tempTextArea);
        const svgElement = document.getElementById('copyIconHelp');
        svgElement.innerHTML = `
          <path d="M1.5 12.3286L8.35 19.1786L22.05 4.5" stroke="#517C77" stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round"/>
        `;
    }
    return (
        <div className='card-container'>
            <div className = 'card'>
                <div className='header'>
                    {"Tips for Your Video"}
                    {click ? (
                    <svg id='copyIconHelp' className='svgicon' onClick={copyToClipboard} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <g clip-path="url(#clip0_186_4097)">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M6 3C6 2.20435 6.31607 1.44129 6.87868 0.87868C7.44129 0.316071 8.20435 0 9 0L21 0C21.7956 0 22.5587 0.316071 23.1213 0.87868C23.6839 1.44129 24 2.20435 24 3V15C24 15.7956 23.6839 16.5587 23.1213 17.1213C22.5587 17.6839 21.7956 18 21 18H9C8.20435 18 7.44129 17.6839 6.87868 17.1213C6.31607 16.5587 6 15.7956 6 15V3ZM9 1.5C8.60218 1.5 8.22064 1.65804 7.93934 1.93934C7.65804 2.22064 7.5 2.60218 7.5 3V15C7.5 15.3978 7.65804 15.7794 7.93934 16.0607C8.22064 16.342 8.60218 16.5 9 16.5H21C21.3978 16.5 21.7794 16.342 22.0607 16.0607C22.342 15.7794 22.5 15.3978 22.5 15V3C22.5 2.60218 22.342 2.22064 22.0607 1.93934C21.7794 1.65804 21.3978 1.5 21 1.5H9ZM3 7.5C2.60218 7.5 2.22064 7.65804 1.93934 7.93934C1.65804 8.22064 1.5 8.60218 1.5 9V21C1.5 21.3978 1.65804 21.7794 1.93934 22.0607C2.22064 22.342 2.60218 22.5 3 22.5H15C15.3978 22.5 15.7794 22.342 16.0607 22.0607C16.342 21.7794 16.5 21.3978 16.5 21V19.5H18V21C18 21.7956 17.6839 22.5587 17.1213 23.1213C16.5587 23.6839 15.7956 24 15 24H3C2.20435 24 1.44129 23.6839 0.87868 23.1213C0.316071 22.5587 0 21.7956 0 21V9C0 8.20435 0.316071 7.44129 0.87868 6.87868C1.44129 6.31607 2.20435 6 3 6H4.5V7.5H3Z" fill="#517C77"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_186_4097">
                        <rect width="24" height="24" fill="white"/>
                        </clipPath>
                        </defs>
                    </svg>): null}
                </div>
                {click ? null:(
                    <div className='button-wrapper'>
                        <button onClick={buttonClick}>
                            <p>Get the Tips</p>
                        </button>
                    </div>
                    )}
                {click ? (
                    <>
                    <div className='secondary-header'>
                        <p>Video Idea</p>
                    </div>
                    <div className='text'>
                        {props.text}
                    </div>
                    <div className='secondary-header'>
                        <p>Possible Tags</p>
                    </div>
                        {/* <div className='tag-box'>
                        {props.tags.map((e, index) =>  <div className='messages'><span key={index}>{"#" + e.tag}</span></div>)}
                        </div> */}
                        <div className='tag-box'>
                            {props.tags.map((tag, index) => (
                                <div className='messages'>
                                <span key={index}>{"#" + tag}</span>
                                </div>
                            ))}
                        </div>
                    </>
                    ) : null}
            </div>
        </div>
    );
};