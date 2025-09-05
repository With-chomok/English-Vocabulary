const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((lesson) => displayLesson(lesson.data));
};

const removeActive = () => {
  const lessonbuttons =document.querySelectorAll(".lesson-btn");
  lessonbuttons.forEach(btn => btn.classList.remove("active"))
  
}

const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive();
      const levelBtn = document.getElementById(`lesson-btn-${id}`);
      levelBtn.classList.add("active");
      displayLevelWord(data.data);
    });
};

// {
//   "status": true,
//   "message": "successfully fetched a word details",
//   "data": {
//     "word": "Brisk",
//     "meaning": "চটপটে / দ্রুত",
//     "pronunciation": "ব্রিস্ক",
//     "level": 3,
//     "sentence": "He took a brisk walk in the morning.",
//     "points": 3,
//     "partsOfSpeech": "adjective",
//     "synonyms": [
//       "quick",
//       "energetic"
//     ],
//     "id": 27
//   }
// }
const loadWordDetail = async(id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;

const res = await fetch(url);
const details = await res.json();
displayWordDetailes(details.data);

};
const displayWordDetailes = (word) =>{
// {
//     "word": "Eager",
//     "meaning": "আগ্রহী",
//     "pronunciation": "ইগার",
//     "level": 1,
//     "r": "The kids were eager to open their gifts.",
//     "points": 1,
//     "partsOfSpeech": "adjective",
//     "synonyms": [
//         "enthusiastic",
//         "excited",
//         "keen"
//     ],
//     "id": 5
// }
const detailsBox = document.getElementById("details-container")

detailsBox.innerHTML = `
 <div class="">
        <h2 class="text-2xl font-bold">${word.word} (<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})</h2>
      </div>
      <div class="">
        <h2 class="font-bold">Meaning</h2>
        <p>${word.meaning}</p>
      </div>
      <div class="">
        <h2 class="font-bold">Example</h2>
        <p>${word.sentence}</p>
      </div>
      <div class="">
        <h2 class="font-bold">Synonym</h2>
        <span class="btn"> clas1</span>
        <span class="btn"> clas1</span>
        <span class="btn"> clas1</span>
      </div>

`;
document.getElementById("word_modal").showModal()

}
const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  if (words.length == 0) {
    wordContainer.innerHTML = `

    <div class="rounded-xl  text-center items-center space-y-4 py-10 px-5 col-span-3 
     font-bangla">  
        <img src="./assets/alert-error.png" alt="" class= "mx-auto ">
        <p class="font-semibold text-[#79716B]">নেক্সট Lesson এ যান</p>
        <div class="font-bold text-2xl text-[#18181B] font-bangla">এই 
        Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</div>
      </div>
    
    `;
    return
  }
  words.forEach((word) => {
    const card = document.createElement("div");
    card.innerHTML = `
     <div class="bg-white rounded-xl shadow-md text-center space-y-4 py-10 px-5">
        <h2 class="text-2xl font-bold">${
          word.word ? word.word : "শব্দ পাওয়া যায়নি"
        }</h2>
        <p class="font-semibold ">Meaning /Pronounciation</p>
        <div class="font-medium text-2xl text-[#18181B] font-bangla">${
          word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"
        }/${
      word.pronunciation ? word.pronunciation : "pronunciation পাওয়া যায়নি"
    }</div>
        <div class="flex justify-between  items-center ">
          <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1a91ff1a]  hover:bg-primary  hover:text-white"><i class="fa-solid fa-circle-info"></i></button>
          <button class="btn bg-[#1a91ff1a] hover:bg-primary hover:text-white" ><i class="fa-solid fa-volume-high"></i></button>
        </div>
      </div>
    `;
    wordContainer.append(card);
  });

};
const displayLesson = (lessons) => {
  const levelContainer = document.getElementById("level-container");

  levelContainer.innerHTML = "";

  lessons.forEach((lesson) => {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
    <button id ="lesson-btn-${lesson.level_no}"
    onclick = "loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
    <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
    </button>`;

    levelContainer.append(btnDiv);
  });
};
loadLessons();
    // my_modal_5.showModal()
