import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  LockKeyhole,
  Menu,
  Play,
  X,
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import { CourseIcon } from '../components/Icons'

export default function Learning() {
  const { courseId } = useParams()
  const navigate = useNavigate()

  const {
    t,
    allCourses,
    enrollments,
    enroll,
    progress,
    markComplete,
    quizPasses,
    passQuiz,
  } = useApp()

  const course = allCourses.find((item) => item.id === courseId)

  const [activeIndex, setActiveIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [result, setResult] = useState(null)
  const [showQuiz, setShowQuiz] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showExam, setShowExam] = useState(false)

  const lessons = useMemo(() => {
    if (!course) return []

    return course.modules.flatMap((module, moduleIndex) =>
      module.lessons.map((lesson, lessonIndex) => ({
        ...lesson,
        moduleTitle: module.title,
        moduleIndex,
        lessonIndex,
        key: `${course.id}-${moduleIndex}-${lessonIndex}`,
      })),
    )
  }, [course])

  useEffect(() => {
    if (course && !enrollments.includes(course.id)) {
      enroll(course.id)
    }
  }, [course, enrollments, enroll])

  if (!course) {
    return (
      <div className="empty-state">
        <h2>Course not found</h2>
        <Link to="/courses" className="button button-primary">
          Browse courses
        </Link>
      </div>
    )
  }

  const current = lessons[Math.min(activeIndex, lessons.length - 1)]
  const done = progress[course.id] || []
  const passed = quizPasses || {}

  const isUnlocked = (index) =>
    index === 0 || done.includes(lessons[index - 1]?.key)

  const completeCount = done.filter((key) =>
    lessons.some((lesson) => lesson.key === key),
  ).length

  const percent = lessons.length
    ? Math.round((completeCount / lessons.length) * 100)
    : 0

  const quizKey = current?.key
  const alreadyPassed = Boolean(passed[quizKey])

  const canNext =
    Boolean(current) &&
    done.includes(current.key) &&
    (alreadyPassed || !current.quiz)

  const moveTo = (index) => {
    if (index >= 0 && index < lessons.length && isUnlocked(index)) {
      setActiveIndex(index)
      setShowQuiz(false)
      setResult(null)
      setAnswers({})
      setShowExam(false)
      setSidebarOpen(false)
    }
  }

  const markLesson = () => {
    if (!current) return

    markComplete(course.id, current.key)

    if (current.quiz && !passed[current.key]) {
      setShowQuiz(true)
    } else {
      setShowQuiz(false)
    }
  }

  const submitQuiz = () => {
    if (!current?.quiz || answers[current.key] === undefined) return

    const correct = answers[current.key] === current.quiz.answer

    setResult(correct ? 'pass' : 'fail')

    if (correct) {
      passQuiz(current.key)
    }
  }

  const finalKey = `${course.id}-final`

  const submitExam = () => {
    if (answers.exam === undefined || percent < 100) return

    if (Number(answers.exam) === 1) {
      passQuiz(finalKey)
      setResult('exam-pass')
    } else {
      setResult('exam-fail')
    }
  }

  const openExam = () => {
    if (percent < 100) return

    setShowExam(true)
    setShowQuiz(false)
    setResult(null)
    setSidebarOpen(false)
  }

  return (
    <div className="learning-layout">
      <aside
        className={`curriculum-sidebar ${
          sidebarOpen ? 'curriculum-open' : ''
        }`}
      >
        <div className="curriculum-head">
          <Link to="/courses" className="back-link">
            <ArrowLeft size={16} />
            {t('back')}
          </Link>

          <button
            className="icon-button curriculum-close"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close curriculum"
          >
            <X size={18} />
          </button>
        </div>

        <div className="curriculum-course">
          <span className={`mini-course-icon ${course.color}`}>
            <CourseIcon name={course.icon} />
          </span>

          <div>
            <strong>{course.title}</strong>
            <small>
              {course.level} · {course.duration}
            </small>
          </div>
        </div>

        <div className="curriculum-progress">
          <div className="progress-label">
            <span>{t('progress')}</span>
            <strong>{percent}%</strong>
          </div>

          <div className="progress-track">
            <span style={{ width: `${percent}%` }} />
          </div>
        </div>

        {course.modules.map((module, moduleIndex) => (
          <div className="module-block" key={module.title}>
            <div className="module-title">
              <span>
                {t('module')} {moduleIndex + 1}
              </span>
              <strong>{module.title}</strong>
            </div>

            {lessons
              .filter((lesson) => lesson.moduleIndex === moduleIndex)
              .map((lesson) => {
                const index = lessons.findIndex(
                  (item) => item.key === lesson.key,
                )

                const locked = !isUnlocked(index)
                const completed = done.includes(lesson.key)

                return (
                  <button
                    key={lesson.key}
                    disabled={locked}
                    className={`lesson-nav-item ${
                      index === activeIndex && !showExam ? 'selected' : ''
                    } ${completed ? 'done' : ''}`}
                    onClick={() => moveTo(index)}
                  >
                    <span className="lesson-status">
                      {completed ? (
                        <Check size={14} />
                      ) : locked ? (
                        <LockKeyhole size={13} />
                      ) : (
                        <Play size={12} />
                      )}
                    </span>

                    <span>{lesson.title}</span>
                  </button>
                )
              })}
          </div>
        ))}

        <button
          className={`lesson-nav-item final-exam-nav ${
            showExam ? 'selected' : ''
          }`}
          disabled={percent < 100}
          onClick={openExam}
        >
          <span className="lesson-status">
            {percent < 100 ? (
              <LockKeyhole size={13} />
            ) : (
              <CheckCircle2 size={14} />
            )}
          </span>

          <span>{t('finalExam')}</span>
        </button>
      </aside>

      {sidebarOpen && (
        <button
          className="learning-scrim"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close curriculum"
        />
      )}

      <div className="learning-main">
        <header className="learning-topbar">
          <button
            className="icon-button curriculum-open-button"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open curriculum"
          >
            <Menu />
          </button>

          <div className="learning-breadcrumb">
            <Link to="/courses">Courses</Link>
            <ChevronRight size={14} />
            <span>{course.title}</span>
          </div>

          <span className="free-pill">{t('freeLabel')}</span>
        </header>

        <div className="learning-content">
          {!showExam ? (
            current ? (
              <>
                <div className="lesson-overline">
                  <span>
                    {t('module')} {current.moduleIndex + 1}
                  </span>

                  <span>•</span>

                  <span>
                    {t('lesson')} {activeIndex + 1} of {lessons.length}
                  </span>
                </div>

                <h1 className="lesson-heading">{current.title}</h1>

                <p className="lesson-lead">{current.body}</p>

                <div className="lesson-objectives">
                  <strong>In this lesson</strong>

                  {(current.objectives || []).map((objective) => (
                    <span key={objective}>
                      <CheckCircle2 size={16} />
                      {objective}
                    </span>
                  ))}
                </div>

                <div className="lesson-rich-content">
                  <h2>Learn the concept</h2>

                  <p>{current.content}</p>

                  {current.code && (
                    <div className="code-example">
                      <div className="code-top">
                        <span>
                          <i />
                          <i />
                          <i />
                        </span>

                        <small>Example</small>
                      </div>

                      <pre>
                        <code>
                          {current.code.replaceAll('\\n', '\n')}
                        </code>
                      </pre>
                    </div>
                  )}

                  <div className="learning-tip">
                    <span>✦</span>

                    <div>
                      <strong>Learning tip</strong>
                      <p>
                        Try changing the example and observe what happens.
                        Small experiments help concepts stick.
                      </p>
                    </div>
                  </div>
                </div>

                {showQuiz && current.quiz && (
                  <section className="quiz-panel">
                    <div className="quiz-panel-head">
                      <span className="quiz-icon">
                        <CircleHelp />
                      </span>

                      <div>
                        <span className="section-kicker">{t('quiz')}</span>
                        <h2>Check your understanding</h2>
                      </div>
                    </div>

                    <p>{t('quizGate')}</p>

                    <div className="quiz-question">
                      <span>QUESTION 1 OF 1</span>
                      <h3>{current.quiz.question}</h3>

                      <div className="quiz-options">
                        {current.quiz.options.map((option, index) => (
                          <label
                            key={option}
                            className={`quiz-option ${
                              answers[current.key] === index ? 'chosen' : ''
                            } ${
                              result === 'pass' &&
                              index === current.quiz.answer
                                ? 'answer-correct'
                                : ''
                            }`}
                          >
                            <input
                              type="radio"
                              name={current.key}
                              checked={answers[current.key] === index}
                              onChange={() => {
                                setAnswers((previous) => ({
                                  ...previous,
                                  [current.key]: index,
                                }))
                                setResult(null)
                              }}
                            />

                            <span className="option-letter">
                              {String.fromCharCode(65 + index)}
                            </span>

                            {option}
                          </label>
                        ))}
                      </div>

                      {result && result !== 'exam-pass' &&
                        result !== 'exam-fail' && (
                          <div className={`quiz-result ${result}`}>
                            {result === 'pass' ? (
                              <>
                                <CheckCircle2 />
                                {t('pass')} {current.quiz.explanation}
                              </>
                            ) : (
                              <>
                                Not quite. {current.quiz.explanation}
                              </>
                            )}
                          </div>
                        )}

                      <div className="quiz-actions">
                        <button
                          className="button button-primary"
                          onClick={submitQuiz}
                          disabled={answers[current.key] === undefined}
                        >
                          {t('submit')}
                        </button>

                        {result === 'fail' && (
                          <button
                            className="button button-secondary"
                            onClick={() => {
                              setAnswers((previous) => ({
                                ...previous,
                                [current.key]: undefined,
                              }))
                              setResult(null)
                            }}
                          >
                            {t('tryAgain')}
                          </button>
                        )}

                        {result === 'pass' && (
                          <span className="pass-hint">
                            Knowledge check passed. You can continue below.
                          </span>
                        )}
                      </div>
                    </div>
                  </section>
                )}

                <div className="lesson-bottom-actions">
                  <button
                    className="button button-secondary"
                    onClick={() => moveTo(activeIndex - 1)}
                    disabled={activeIndex === 0}
                  >
                    <ArrowLeft size={16} />
                    {t('previous')}
                  </button>

                  {!done.includes(current.key) ? (
                    <button
                      className="button button-primary"
                      onClick={markLesson}
                    >
                      {t('complete')}
                      <Check size={16} />
                    </button>
                  ) : (
                    <span className="completed-label">
                      <CheckCircle2 size={17} />
                      {t('lessonComplete')}
                    </span>
                  )}

                  {activeIndex < lessons.length - 1 ? (
                    <button
                      className="button button-primary"
                      onClick={() => moveTo(activeIndex + 1)}
                      disabled={!canNext}
                    >
                      {t('next')}
                      <ArrowRight size={16} />
                    </button>
                  ) : (
                    <button
                      className="button button-primary"
                      onClick={openExam}
                      disabled={percent < 100}
                    >
                      {t('finalExam')}
                      <ArrowRight size={16} />
                    </button>
                  )}
                </div>
              </>
            ) : (
              <div className="empty-state">
                <h2>No lessons available</h2>
                <p>This course does not have any lessons yet.</p>
                <Link to="/courses" className="button button-primary">
                  Browse courses
                </Link>
              </div>
            )
          ) : (
            <section className="exam-view">
              <span className="exam-badge">
                <LockKeyhole size={15} />
                FINAL MILESTONE
              </span>

              <h1>{t('finalExam')}</h1>
              <p>{t('examNote')}</p>

              <div className="exam-summary">
                <div>
                  <strong>{lessons.length}</strong>
                  <span>Required lessons</span>
                </div>

                <div>
                  <strong>{percent}%</strong>
                  <span>Course progress</span>
                </div>

                <div>
                  <strong>80%</strong>
                  <span>Passing score</span>
                </div>
              </div>

              {percent < 100 ? (
                <div className="locked-notice">
                  <LockKeyhole />

                  <div>
                    <strong>Exam locked</strong>
                    <p>
                      Complete all required lessons to unlock the final
                      examination.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="quiz-panel">
                  <h2>Final exam — demonstration</h2>

                  <p>
                    Answer the question below. This is a demonstration exam;
                    the production backend should verify exam results and
                    certificate eligibility.
                  </p>

                  <div className="quiz-question">
                    <span>QUESTION 1 OF 1 · DEMO</span>

                    <h3>
                      What is the best way to progress through a structured
                      course?
                    </h3>

                    <div className="quiz-options">
                      {[
                        'Skip the required activities',
                        'Complete lessons and pass required assessments',
                        'Mark everything complete immediately',
                      ].map((option, index) => (
                        <label
                          className={`quiz-option ${
                            answers.exam === index ? 'chosen' : ''
                          }`}
                          key={option}
                        >
                          <input
                            type="radio"
                            name="exam"
                            checked={answers.exam === index}
                            onChange={() => {
                              setAnswers((previous) => ({
                                ...previous,
                                exam: index,
                              }))
                              setResult(null)
                            }}
                          />

                          <span className="option-letter">
                            {String.fromCharCode(65 + index)}
                          </span>

                          {option}
                        </label>
                      ))}
                    </div>

                    {result === 'exam-pass' && (
                      <div className="quiz-result pass">
                        <CheckCircle2 />
                        You passed the demonstration exam. Certificate
                        eligibility is now unlocked.
                      </div>
                    )}

                    {result === 'exam-fail' && (
                      <div className="quiz-result fail">
                        Not quite. Review the learning requirements and try
                        again.
                      </div>
                    )}

                    <div className="quiz-actions">
                      <button
                        className="button button-primary"
                        onClick={submitExam}
                        disabled={answers.exam === undefined}
                      >
                        Submit final exam
                      </button>

                      {result === 'exam-fail' && (
                        <button
                          className="button button-secondary"
                          onClick={() => {
                            setAnswers((previous) => ({
                              ...previous,
                              exam: undefined,
                            }))
                            setResult(null)
                          }}
                        >
                          {t('tryAgain')}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {result === 'exam-pass' && (
                <div className="certificate-success">
                  <span>
                    <CheckCircle2 />
                  </span>

                  <h2>Certificate eligibility unlocked!</h2>

                  <p>
                    This is a demo result. The real backend must verify results
                    and issue certificates.
                  </p>

                  <Link
                    to="/certificates"
                    className="button button-primary"
                  >
                    View certificates
                    <ArrowRight size={16} />
                  </Link>
                </div>
              )}

              <div className="lesson-bottom-actions">
                <button
                  className="button button-secondary"
                  onClick={() => {
                    setShowExam(false)
                    setActiveIndex(Math.max(0, lessons.length - 1))
                    setResult(null)
                  }}
                >
                  <ArrowLeft size={16} />
                  Back to lessons
                </button>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}
