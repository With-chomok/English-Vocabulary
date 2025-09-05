const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((lesson) => displayLesson(lesson.data));
};

const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      
      displayLevelWord(data.data)
    });
};
const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  if (words == 0) {
    wordContainer.innerHTML = `

    <div class="rounded-xl  text-center items-center space-y-4 py-10 px-5 col-span-3 
     font-bangla">
        <img src="./assets/alert-error.png" alt="" class= "mx-auto ">
        <p class="font-semibold text-[#79716B]">নেক্সট Lesson এ যান</p>
        <div class="font-bold text-2xl text-[#18181B] font-bangla">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</div>
      </div>
    
    `;
  }
  words.forEach((word) => {
    const card = document.createElement("div");
    card.innerHTML = `
     <div class="bg-white rounded-xl shadow-md text-center space-y-4 py-10 px-5 h-za9lo
     ">
        <h2 class="text-2xl font-bold">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
        <p class="font-semibold ">Meaning /Pronounciation</p>
        <div class="font-medium text-2xl text-[#18181B] font-bangla">${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"}/${word.pronunciation ? word.pronunciation : "pronunciation পাওয়া যায়নি"}</div>
        <div class="flex justify-between  items-center ">
          <button class="btn bg-[#1a91ff1a]  hover:bg-primary  hover:text-white"><i class="fa-solid fa-circle-info"></i></button>
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
    <button href="" onclick = "loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary"
          ><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>`;

    levelContainer.append(btnDiv);
  });
};
loadLessons();
