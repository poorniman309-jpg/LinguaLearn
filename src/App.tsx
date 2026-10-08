import { useState } from "react";
import {
  Home,
  BookOpen,
  Brain,
  Heart,
  BarChart3,
  Settings,
  Globe,
  Sun,
  Moon,
  User,
  Flame,
  Volume2,
  Star,
  ChevronRight,
  Check,
  Target,
  Trophy,
  Mic,
} from "lucide-react";
import "./App.css";

type Word = {
  word: string;
  meaning: string;
  example: string;
};

const words: Record<string, Word[]> = {
  Spanish: [
    { word: "Hola", meaning: "Hello", example: "¡Hola! ¿Cómo estás?" },
    { word: "Gracias", meaning: "Thank you", example: "Gracias por tu ayuda." },
    { word: "Amigo", meaning: "Friend", example: "Él es mi amigo." },
    { word: "Casa", meaning: "House", example: "Mi casa es grande." },
    { word: "Comida", meaning: "Food", example: "La comida está deliciosa." },
    { word: "Familia", meaning: "Family", example: "Mi familia es importante." },
  ],

  English: [
    { word: "Hello", meaning: "A greeting", example: "Hello! How are you?" },
    { word: "Beautiful", meaning: "Very attractive", example: "The garden is beautiful." },
    { word: "Friend", meaning: "A person you like", example: "She is my best friend." },
    { word: "House", meaning: "A place to live", example: "My house is nearby." },
    { word: "Success", meaning: "Achievement", example: "Hard work brings success." },
    { word: "Family", meaning: "A group of relatives", example: "My family is happy." },
  ],

  Kannada: [
    {
      word: "ನಮಸ್ಕಾರ",
      meaning: "Hello",
      example: "ನಮಸ್ಕಾರ! ಹೇಗಿದ್ದೀರಾ?",
    },
    {
      word: "ಧನ್ಯವಾದ",
      meaning: "Thank you",
      example: "ನಿಮ್ಮ ಸಹಾಯಕ್ಕೆ ಧನ್ಯವಾದ.",
    },
    {
      word: "ಸ್ನೇಹಿತ",
      meaning: "Friend",
      example: "ಅವನು ನನ್ನ ಸ್ನೇಹಿತ.",
    },
    {
      word: "ಮನೆ",
      meaning: "House",
      example: "ಇದು ನನ್ನ ಮನೆ.",
    },
    {
      word: "ಆಹಾರ",
      meaning: "Food",
      example: "ಆಹಾರ ತುಂಬಾ ರುಚಿಯಾಗಿದೆ.",
    },
    {
      word: "ಕುಟುಂಬ",
      meaning: "Family",
      example: "ನನ್ನ ಕುಟುಂಬ ಸಂತೋಷವಾಗಿದೆ.",
    },
  ],

  Hindi: [
    {
      word: "नमस्ते",
      meaning: "Hello",
      example: "नमस्ते! आप कैसे हैं?",
    },
    {
      word: "धन्यवाद",
      meaning: "Thank you",
      example: "आपकी मदद के लिए धन्यवाद।",
    },
    {
      word: "दोस्त",
      meaning: "Friend",
      example: "वह मेरा दोस्त है।",
    },
    {
      word: "घर",
      meaning: "House",
      example: "यह मेरा घर है।",
    },
    {
      word: "खाना",
      meaning: "Food",
      example: "खाना बहुत अच्छा है।",
    },
    {
      word: "परिवार",
      meaning: "Family",
      example: "मेरा परिवार खुश है।",
    },
  ],

  French: [
    {
      word: "Bonjour",
      meaning: "Hello",
      example: "Bonjour! Comment allez-vous?",
    },
    {
      word: "Merci",
      meaning: "Thank you",
      example: "Merci pour votre aide.",
    },
    {
      word: "Ami",
      meaning: "Friend",
      example: "Il est mon ami.",
    },
    {
      word: "Maison",
      meaning: "House",
      example: "Ma maison est grande.",
    },
    {
      word: "Nourriture",
      meaning: "Food",
      example: "La nourriture est délicieuse.",
    },
    {
      word: "Famille",
      meaning: "Family",
      example: "Ma famille est heureuse.",
    },
  ],
};

const quizQuestions = [
  {
    question: 'What does "gracias" mean?',
    options: ["Hello", "Thank you", "Goodbye", "Please"],
    answer: "Thank you",
  },
  {
    question: 'What does "amigo" mean?',
    options: ["Food", "Goodbye", "Friend", "House"],
    answer: "Friend",
  },
  {
    question: 'What does "casa" mean?',
    options: ["House", "Friend", "Hello", "Food"],
    answer: "House",
  },
  {
    question: 'What does "hola" mean?',
    options: ["Thank you", "Hello", "Friend", "Food"],
    answer: "Hello",
  },
];

function App() {
  const [language, setLanguage] = useState("Spanish");
  const [page, setPage] = useState("Home");
  const [dark, setDark] = useState(true);
  const [index, setIndex] = useState(0);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [learned, setLearned] = useState(42);
  const [quizIndex, setQuizIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(85);

  const list = words[language];
  const current = list[index % list.length];
  const quiz = quizQuestions[quizIndex];

  const speak = (word = current.word) => {
    const speech = new SpeechSynthesisUtterance(word);

    speech.lang =
      language === "Spanish"
        ? "es-ES"
        : language === "English"
        ? "en-US"
        : language === "Kannada"
        ? "kn-IN"
        : language === "Hindi"
        ? "hi-IN"
        : "fr-FR";

    speech.rate = 0.8;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
  };

  const changeLanguage = (value: string) => {
    setLanguage(value);
    setIndex(0);
    setPage("Home");
  };

  const nextWord = () => {
    setIndex((i) => (i + 1) % list.length);
    setLearned((n) => Math.min(100, n + 1));
  };

  const selectLearnWord = (wordIndex: number) => {
    setIndex(wordIndex);
  };

  const toggleFavorite = (word = current.word) => {
    setFavorites((old) =>
      old.includes(word)
        ? old.filter((x) => x !== word)
        : [...old, word]
    );
  };

  const chooseAnswer = (value: string) => {
    if (answer) return;

    setAnswer(value);

    if (value === quiz.answer) {
      setScore((s) => Math.min(100, s + 5));
    }
  };

  const nextQuestion = () => {
    setAnswer("");
    setQuizIndex((i) => (i + 1) % quizQuestions.length);
  };

  const navItems = [
    ["Home", Home],
    ["Learn", BookOpen],
    ["Quiz", Brain],
    ["Favorites", Heart],
    ["Progress", BarChart3],
    ["Settings", Settings],
  ] as const;

  return (
    <div className={dark ? "app dark" : "app"}>
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-logo">
            <Globe size={28} />
          </div>

          <div>
            <h1>
              Lingua<span>Learn</span>
            </h1>
            <p>Learn · Practice · Grow</p>
          </div>
        </div>

        <nav>
          {navItems.map(([name, Icon]) => (
            <button
              key={name}
              className={`nav-item ${
                page === name ? "active" : ""
              }`}
              onClick={() => setPage(name)}
            >
              <Icon size={22} />
              <span>{name}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-tip">
          <div className="plant">🌱</div>
          <strong>Small steps</strong>
          <span>lead to big fluency!</span>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <h2>
              {page === "Home"
                ? "Hello, Learner! 👋"
                : page}
            </h2>

            <p>
              {page === "Home"
                ? "Keep going! Every new word brings you closer to your goals."
                : page === "Learn"
                ? `Build your ${language} vocabulary one word at a time.`
                : `Explore your ${page.toLowerCase()} section.`}
            </p>
          </div>

          <div className="top-actions">
            <div className="language-select">
              <Globe size={18} />

              <select
                value={language}
                onChange={(e) =>
                  changeLanguage(e.target.value)
                }
              >
                <option>Spanish</option>
                <option>English</option>
                <option>Kannada</option>
                <option>Hindi</option>
                <option>French</option>
              </select>

              <ChevronRight
                className="chevron"
                size={17}
              />
            </div>

            <button
              className="round-btn"
              onClick={() => setDark(!dark)}
            >
              {dark ? <Sun /> : <Moon />}
            </button>

            <button className="profile">
              <User />
            </button>
          </div>
        </header>

        {/* ================= HOME ================= */}

        {page === "Home" && (
          <>
            <section className="stats">
              <div className="stat orange">
                <div className="stat-icon">
                  <Flame />
                </div>

                <div>
                  <b>7</b>
                  <span>Day Streak</span>
                  <small>Keep it up!</small>
                </div>
              </div>

              <div className="stat blue">
                <div className="stat-icon">
                  <BookOpen />
                </div>

                <div>
                  <b>{learned}</b>
                  <span>Words Learned</span>
                  <small>You're doing great!</small>
                </div>
              </div>

              <div className="stat pink">
                <div className="stat-icon">
                  <Heart />
                </div>

                <div>
                  <b>{favorites.length}</b>
                  <span>Favorites</span>
                  <small>Saved for later</small>
                </div>
              </div>

              <div className="stat green">
                <div className="stat-icon">
                  <Target />
                </div>

                <div>
                  <b>{score}%</b>
                  <span>Quiz Score</span>
                  <small>Excellent!</small>
                </div>
              </div>
            </section>

            <section className="word-card">
              <div className="word-info">
                <div className="label">
                  <Star size={19} fill="currentColor" />
                  Word of the Day
                </div>

                <div className="word-heading">
                  <h3>{current.word}</h3>

                  <button onClick={() => speak()}>
                    <Volume2 />
                  </button>
                </div>

                <p className="pronunciation">
                  (
                  {language === "Spanish"
                    ? "ho-la"
                    : current.word}
                  )
                </p>

                <h4>{current.meaning}</h4>

                <div className="example">
                  <b>“{current.example}”</b>
                  <span>{current.meaning}</span>
                </div>

                <div className="word-actions">
                  <button
                    className="listen"
                    onClick={() => speak()}
                  >
                    <Volume2 />
                    Listen
                  </button>

                  <button
                    className="favorite"
                    onClick={() => toggleFavorite()}
                  >
                    <Heart
                      fill={
                        favorites.includes(current.word)
                          ? "currentColor"
                          : "none"
                      }
                    />

                    {favorites.includes(current.word)
                      ? "Favorited"
                      : "Add to Favorites"}
                  </button>

                  <button
                    className="next"
                    onClick={nextWord}
                  >
                    Next Word
                    <ChevronRight />
                  </button>
                </div>
              </div>

              <div className="photo">
                <div className="photo-content">
                  <Globe size={75} />
                  <span>{language}</span>
                </div>
              </div>
            </section>

            <section className="quick">
              <button
                className="quick-card purple"
                onClick={() => setPage("Learn")}
              >
                <BookOpen />

                <div>
                  <b>Learn New Words</b>
                  <span>Build your vocabulary</span>
                </div>

                <ChevronRight />
              </button>

              <button
                className="quick-card teal"
                onClick={() => setPage("Quiz")}
              >
                <Brain />

                <div>
                  <b>Take a Quiz</b>
                  <span>Test your knowledge</span>
                </div>

                <ChevronRight />
              </button>

              <button
                className="quick-card red"
                onClick={() => speak()}
              >
                <Mic />

                <div>
                  <b>Practice Speaking</b>
                  <span>Improve pronunciation</span>
                </div>

                <ChevronRight />
              </button>

              <button
                className="quick-card blue"
                onClick={() => setPage("Favorites")}
              >
                <Star />

                <div>
                  <b>View Favorites</b>
                  <span>Quick access to saved words</span>
                </div>

                <ChevronRight />
              </button>
            </section>

            <section className="lower">
              <div className="panel">
                <div className="panel-head">
                  <h3>
                    <BarChart3 />
                    Your Progress
                  </h3>

                  <button
                    onClick={() => setPage("Progress")}
                  >
                    View Details →
                  </button>
                </div>

                <div className="progress-text">
                  <span>Vocabulary Progress</span>
                  <b>{learned} / 100 words</b>
                </div>

                <div className="bar">
                  <i
                    style={{
                      width: `${learned}%`,
                    }}
                  />
                </div>

                <strong className="percent">
                  {learned}%
                </strong>

                <div className="levels">
                  <div className="done">
                    <Check />
                    <span>Beginner</span>
                  </div>

                  <div>
                    <Trophy />
                    <span>Intermediate</span>
                  </div>

                  <div>
                    <Trophy />
                    <span>Advanced</span>
                  </div>

                  <div>
                    <Trophy />
                    <span>Fluent</span>
                  </div>
                </div>
              </div>

              <div className="panel recent">
                <div className="panel-head">
                  <h3>
                    <BookOpen />
                    Recent Words
                  </h3>

                  <button
                    onClick={() => setPage("Learn")}
                  >
                    View All →
                  </button>
                </div>

                {list.slice(1).map((word) => (
                  <div
                    className="recent-row"
                    key={word.word}
                  >
                    <div>
                      <b>{word.word}</b>
                      <span>{word.meaning}</span>
                    </div>

                    <div className="row-actions">
                      <button
                        onClick={() =>
                          speak(word.word)
                        }
                      >
                        <Volume2 />
                      </button>

                      <button
                        onClick={() =>
                          toggleFavorite(word.word)
                        }
                      >
                        <Heart
                          fill={
                            favorites.includes(word.word)
                              ? "currentColor"
                              : "none"
                          }
                        />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="panel quiz">
                <div className="panel-head">
                  <h3>
                    <Brain />
                    Quick Quiz
                  </h3>
                </div>

                <p>{quiz.question}</p>

                {quiz.options.map((option) => {
                  const correct =
                    answer && option === quiz.answer;

                  const wrong =
                    answer === option &&
                    option !== quiz.answer;

                  return (
                    <button
                      key={option}
                      className={`quiz-option ${
                        correct ? "correct" : ""
                      } ${
                        wrong ? "wrong" : ""
                      }`}
                      onClick={() =>
                        chooseAnswer(option)
                      }
                    >
                      {option}

                      {correct && <Check />}
                    </button>
                  );
                })}

                <button
                  className="next-question"
                  onClick={nextQuestion}
                >
                  Next Question
                  <ChevronRight />
                </button>
              </div>
            </section>
          </>
        )}

        {/* ================= LEARN ================= */}

        {page === "Learn" && (
          <section className="learn-page">
            <div className="learn-header">
              <div>
                <div className="learn-title">
                  <BookOpen size={27} />
                  <h2>Learn {language}</h2>
                </div>

                <p>
                  Choose a word and discover its meaning,
                  example, and pronunciation.
                </p>
              </div>

              <div className="learn-count">
                <span>Words</span>
                <b>{list.length}</b>
              </div>
            </div>

            <div className="learn-layout">
              <div className="word-list-card">
                <div className="word-list-header">
                  <h3>Vocabulary</h3>
                  <span>{list.length} words</span>
                </div>

                <div className="word-list">
                  {list.map((word, wordIndex) => (
                    <button
                      key={word.word}
                      className={`learn-word-item ${
                        index === wordIndex
                          ? "selected"
                          : ""
                      }`}
                      onClick={() =>
                        selectLearnWord(wordIndex)
                      }
                    >
                      <div className="word-number">
                        {String(wordIndex + 1).padStart(
                          2,
                          "0"
                        )}
                      </div>

                      <div className="word-item-content">
                        <b>{word.word}</b>
                        <span>{word.meaning}</span>
                      </div>

                      <ChevronRight size={18} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="learn-detail-card">
                <div className="learn-card-top">
                  <span className="word-badge">
                    WORD {index + 1}
                  </span>

                  <button
                    className="learn-speak"
                    onClick={() => speak()}
                  >
                    <Volume2 size={21} />
                    Listen
                  </button>
                </div>

                <div className="learn-main-word">
                  <span>{language}</span>
                  <h1>{current.word}</h1>

                  <p className="learn-pronunciation">
                    {language === "Spanish"
                      ? "ho-la"
                      : "Pronunciation practice"}
                  </p>
                </div>

                <div className="solution-box">
                  <div className="solution-icon">
                    <Check />
                  </div>

                  <div>
                    <span>Meaning</span>
                    <h3>{current.meaning}</h3>
                  </div>
                </div>

                <div className="learn-example">
                  <div className="example-icon">
                    <Star size={18} />
                  </div>

                  <div>
                    <span>Example</span>
                    <p>“{current.example}”</p>
                  </div>
                </div>

                <div className="learn-actions">
                  <button
                    className="learn-action-listen"
                    onClick={() => speak()}
                  >
                    <Volume2 />
                    Listen
                  </button>

                  <button
                    className="learn-action-favorite"
                    onClick={() =>
                      toggleFavorite()
                    }
                  >
                    <Heart
                      fill={
                        favorites.includes(
                          current.word
                        )
                          ? "currentColor"
                          : "none"
                      }
                    />

                    {favorites.includes(
                      current.word
                    )
                      ? "Favorited"
                      : "Add to Favorites"}
                  </button>

                  <button
                    className="learn-action-next"
                    onClick={nextWord}
                  >
                    Next Word
                    <ChevronRight />
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ================= QUIZ ================= */}

        {page === "Quiz" && (
          <section className="page-card">
            <Brain size={45} />

            <h2>Language Quiz</h2>

            <p>Test your vocabulary knowledge.</p>

            <div className="big-quiz">
              <span>
                Question {quizIndex + 1} of{" "}
                {quizQuestions.length}
              </span>

              <h2>{quiz.question}</h2>

              {quiz.options.map((option) => {
                const correct =
                  answer && option === quiz.answer;

                const wrong =
                  answer === option &&
                  option !== quiz.answer;

                return (
                  <button
                    key={option}
                    className={`big-option ${
                      correct ? "correct" : ""
                    } ${
                      wrong ? "wrong" : ""
                    }`}
                    onClick={() =>
                      chooseAnswer(option)
                    }
                  >
                    {option}
                    {correct && <Check />}
                  </button>
                );
              })}

              <button
                className="next-question"
                onClick={nextQuestion}
              >
                Next Question
                <ChevronRight />
              </button>
            </div>
          </section>
        )}

        {/* ================= FAVORITES ================= */}

        {page === "Favorites" && (
          <section className="page-card">
            <Heart size={45} />

            <h2>Favorite Words</h2>

            <p>Your saved vocabulary.</p>

            {favorites.length === 0 ? (
              <div className="empty">
                <Heart size={40} />

                <h3>No favorites yet</h3>

                <p>
                  Click the heart button while learning
                  a word to save it here.
                </p>
              </div>
            ) : (
              <div className="favorites">
                {favorites.map((word) => (
                  <div
                    className="fav-row"
                    key={word}
                  >
                    <div>
                      <b>{word}</b>

                      <span>
                        {list.find(
                          (x) => x.word === word
                        )?.meaning ||
                          "Saved word"}
                      </span>
                    </div>

                    <button
                      onClick={() =>
                        toggleFavorite(word)
                      }
                    >
                      <Heart fill="currentColor" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* ================= PROGRESS ================= */}

        {page === "Progress" && (
          <section className="page-card">
            <BarChart3 size={45} />

            <h2>Your Learning Progress</h2>

            <p>
              Keep learning to reach the next level.
            </p>

            <div className="big-progress">
              <div className="progress-title">
                <span>Words Learned</span>
                <b>{learned}/100</b>
              </div>

              <div className="bar">
                <i
                  style={{
                    width: `${learned}%`,
                  }}
                />
              </div>

              <div className="achievements">
                <div>
                  <Flame />
                  <b>7</b>
                  <span>Day Streak</span>
                </div>

                <div>
                  <BookOpen />
                  <b>{learned}</b>
                  <span>Words</span>
                </div>

                <div>
                  <Heart />
                  <b>{favorites.length}</b>
                  <span>Favorites</span>
                </div>

                <div>
                  <Trophy />
                  <b>{score}%</b>
                  <span>Quiz Score</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ================= SETTINGS ================= */}

        {page === "Settings" && (
          <section className="page-card settings">
            <Settings size={45} />

            <h2>Settings</h2>

            <p>
              Customize your learning experience.
            </p>

            <div className="setting-row">
              <div>
                <b>Language</b>
                <span>
                  Choose your learning language
                </span>
              </div>

              <select
                value={language}
                onChange={(e) =>
                  changeLanguage(e.target.value)
                }
              >
                <option>Spanish</option>
                <option>English</option>
                <option>Kannada</option>
                <option>Hindi</option>
                <option>French</option>
              </select>
            </div>

            <div className="setting-row">
              <div>
                <b>Dark Mode</b>
                <span>
                  Change the application theme
                </span>
              </div>

              <button
                className="theme-button"
                onClick={() => setDark(!dark)}
              >
                {dark ? <Sun /> : <Moon />}
                {dark ? "Dark" : "Light"}
              </button>
            </div>
          </section>
        )}

        <footer>
          <div>
            <Globe />
            <b>LinguaLearn</b>
          </div>

          <span>
            New language. A bigger world. 🌎
          </span>
        </footer>
      </main>
    </div>
  );
}

export default App;