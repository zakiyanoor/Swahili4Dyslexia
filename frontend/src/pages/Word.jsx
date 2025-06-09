import React,{useEffect,useState} from "react"
import "../styles/Word.css";

function Word(){
    const[words,setWords]=useState({});
    const [loading,setLoading]=useState(true)
    const category = "Words"

    useEffect(()=>{
        fetch("http://localhost:5000/api/lessons/words/all")
        .then((res)=>res.json())
        .then((data)=>{
            setWords(data)
            setLoading(false)
        })
        .catch((err)=>{
            console.error("Failed to fetch words:",err);
            setLoading(false);
        });

    },[category]);

    if (loading) return <p>Loading....</p>;
 if (!Object.keys(words).length) return <p>No words found.</p>;

    return(
     <div className="word-page">
        {Object.keys(words).map((category)=>(
            <div key={category} className="category-column">
                <h3>{category}</h3>
                <ul>
                    {words[category].map(({id,content,audio_url,image_url})=>(
                        <li key={id}className="word-item">
                            {image_url && (<img src={`http://localhost:5000/static${image_url}`} alt={content} className="word-img" />
)}
                            

                            <span>{content}</span>
                            <button 
                            onClick={() => new Audio(`http://localhost:5000/api/lesson/audio/${id}`).play()}

                            aria-label={`Play${content}`}
                            >
                             🔊
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        ))

        }

     </div>
    );
}
export default Word