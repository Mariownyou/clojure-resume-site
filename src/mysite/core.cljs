(ns mysite.core
    (:require
      [reagent.core :as r]
      [reagent.dom :as d]))

;; -------------------------
;; Views

(defn download-button []
  [:div.button-container 
    [:a.button.button-orange {:href "assets/Лев Кондратьев.pdf"
                              :download true}
      [:img.svg-icon         {:src      "assets/icons/download.svg" 
                              :alt      "download button"}]]])

(defn progress [] 
  [:div.page-progress
    [:div.page-progress__progress {:id "progress"}]])

(defn navbar []
  [:nav.navbar 
    [:h3 "Резюме"]
    [download-button]])

(defn avatar []
  [:img.avatar {:src "assets/logo.jpg"}])

(defn bio []
  [:div.bio
    [:h1.bio__title                                 "Лева Кондратьев"]
    [:p.bio__subtitle                               "Fullstack Developer"]
    [:a.bio__link {:href "mailto:leva@yaleva.ru"}   "leva@yaleva.ru"]])

(defn title-section []
  [:section.title-section 
    [avatar]
    [bio]])

(defn section [title body]
  [:section.section 
    [:h2.section__title title]
    [:div body]])

(defn link
  ([text link]
    [:a.link {:href link} text])
  ([text link icon_link] 
    [:a.link.link-icon {:href link} (str text " ") 
      [:img {:src icon_link :alt text}]]))

(defn about-section [] 
  [:div.section__body
    [:div.section__text
      [:p "17 лет, родился 17 апр 2004"]
      [:p "г. Санкт-Петербург"]
      [link "фотографии" "https://www.instagram.com/_yalevushka" "assets/icons/camera.svg"]
      [:br]
      [link"кошка" "https://www.instagram.com/kisaolivka" "assets/icons/cat.svg"]
      [:img.height-icon {:src "assets/icons/height.svg" :alt "190 см"}]]
    [:br]
    [:br]
    [:div.section__text
      [:p "Школа «Шамир», 11 класс"]
      [:p "Юношеский клуб космонавтики им. Г.С. Титова, 3 год"]
      [:p "Израильская пропаганда «Мой путь не в Израиль» и «Йофи»"]]])

(defn skill
  ([label progress]
    [:div.skill 
      [:label.skill__label label]
      [:div.skill-progress
        [:div.skill-progress__progress {:style {:width (str progress "%")}}]]])
  ([label progress caption]
    [:div.skill.skill_caption 
      [:label.skill__label label]
      [:div.skill-progress.skill-progress_caption
        [:span.skill-progress__caption caption]
        [:div.skill-progress__progress {:style {:width (str progress "%")}}]]]))

(def tags [
  "git"
  "sass"
  "django"
  "flask"
  "angular"
  "vue"
  "react"
  "laravel"
  "sql"
  "bootstrap"
])

(defn tag [name]
 [:span.tag name])

(defn skills-section [] 
  [:div.section__body 
    [:div.skill-section 
      [:h2.section__subtitle "Languages"]
      [skill "Russian" 100 "Native"]
      [skill "English" 90 "C1"]]
    [:div.skill-section 
      [:h2.section__subtitle "Programming"]
      [skill "Python" 95]
      [skill "HTML" 95]
      [skill "JavaScript" 80]
      [skill "CSS" 70]
      [skill "Clojure" 10]
      [skill "ClojureScript" 10]
      [skill "PHP" 55]
      [skill "Git" 65]]
    [:div.skill-section 
      [:h2.section__subtitle "Technologies"]
      [:div.tags 
        (for [t tags]
          (tag t))]]
    [:div.skill-section 
      [:h2.section__subtitle "Education"]
      [:p.text-line "High school"]]])

(def defenitions {
  :w [
    {:word "Ростелеком —" :d "Разработчик ПО для внутреннего пользования"}
    {:word "Фриланс —" :d "Fullstack, Frontend, Backend проекты. Маленькие проекты. Боты, работы с APIs"}
    {:word "Школа «Шамир» —" :d "Сайт школы"}
    {:word "«ЮКК» —" :d "Внутренние проекты. BOOSTER 2.0"}
    {:word "JES —" :d "Backend форума"}]
  :r [
    {:word "Палей Кирилл Владимирович —" :d "Технический директор Ростелекома МРФ СЗ"}
    {:word "Гинзбург Евгения Львовна —" :d "Директор по маркетингу Ростелекома МРФ СЗ"}
    {:word "Антокольский Владимир Юрьевич —" :d "Директор „ЧОУ «Шамир»“"}
    {:word "Колонтай Римма Яковлевна —" :d "Учитель Английского языка „ЧОУ «Шамир»“"}
  ]})

(defn defenition [word d]
  [:p.text
    [:span (str word " ")]
    [:span.text-light d]])

(defn work [] 
  [:div.section__body
    [:div.skill-section
      [:h2.section__subtitle "Experience"]
      [:div.section__text 
        (for [d (:w defenitions)]
          (defenition (:word d) (:d d)))]]
    [:div.skill-section
      [:h2.section__subtitle "Recommendations"]
      [:div.section__text 
        (for [d (:r defenitions)]
          (defenition (:word d) (:d d)))]]])

(def footer-icons [
  {:name "github"    :link "https://github.com/Mariownyou"}
  {:name "twitter"   :link "https://twitter.com/mariownyou"}
  {:name "instagram" :link "https://www.instagram.com/_yalevushka"}
  {:name "telegram"  :link "https://t.me/Mariownyou"}
  {:name "facebook"  :link "https://www.facebook.com/leva.kondratev"}
])

(defn footer-icon [icon]
  [:a.icon-wrapper {:href (:link icon)} 
    [:img.icon {:src (str "assets/icons/" (:name icon) ".svg") :alt (:name icon)}]])

(defn footer [] 
  [:footer.footer 
    [:div.footer__icons 
      (for [icon footer-icons] 
        (footer-icon icon))]
    [:div.footer__text
        "Сайт написан на ClojureScript"
        [:br]
        [:a.footer__link {:href "https://github.com/Mariownyou/clojure-resume-site"} "репозиторий"]]])

(defn home-page []
  [:div.page 
    [:header.header 
      [navbar]
      [progress]]
    [:div.spacer]
    [title-section]
    [section "About me" [about-section]]
    [section "Skills" [skills-section]]
    [section "Work experience and recommendations" [work]]
    [footer]])

;; -------------------------
;; Initialize app

(defn mount-root []
  (d/render [home-page] (.getElementById js/document "app")))

(defn ^:export init! []
  (mount-root)) 
