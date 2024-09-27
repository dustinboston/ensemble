(serve
 '(!doctype
   (html {:data-framework "ensemble" :lang "en"}
         (head
          (meta {:charset "UTF-8"})
          (meta {:name "description" :content "TodoMVC written with Ensemble."})
          (meta {:name "viewport" :content "width=device-width, initial-scale=1.0"})
          (meta {:http-equiv "X-UA-Compatible" :content "ie=edge"})
          (title "TodoMVC: Ensemble"))
         (style {}
                {"@charset" "'utf-8'"

                 "html, body"
                 {:margin 0 :padding 0}

                 "body"
                 {:font "14px 'Helvetica Neue', Helvetica, Arial, sans-serif"
                  :line-height "1.4em"
                  :background "#f5f5f5"
                  :color "#111111"
                  :min-width "230px"
                  :max-width "550px"
                  :margin "0 auto"
                  :font-weight 300}

                 ".hidden"
                 {:display "none"}

                 ".todoapp"
                 {:background "#fff"
                  :margin "130px 0 40px 0"
                  :position "relative"
                  :box-shadow "0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1)"}

                 ".todoapp input::-webkit-input-placeholder"
                 {:font-style "italic"
                  :font-weight 400
                  :color "rgba(0, 0, 0, 0.4)"}

                 ".todoapp input::-moz-placeholder"
                 {:font-style "italic"
                  :font-weight 400
                  :color "rgba(0, 0, 0, 0.4)"}

                 ".todoapp input::input-placeholder"
                 {:font-style "italic"
                  :font-weight 400
                  :color "rgba(0, 0, 0, 0.4)"}

                 ".todoapp h1"
                 {:position "absolute"
                  :top "-140px"
                  :width "100%"
                  :font-size "80px"
                  :font-weight 200
                  :text-align "center"
                  :color "#b83f45"
                  :-webkit-text-rendering "optimizeLegibility"
                  :-moz-text-rendering "optimizeLegibility"
                  :text-rendering "optimizeLegibility"}

                 ".new-todo, .edit"
                 {:position "relative"
                  :margin "0"
                  :width "100%"
                  :font-size "24px"
                  :font-family "inherit"
                  :font-weight "inherit"
                  :line-height "1.4em"
                  :color "inherit"
                  :padding "6px"
                  :border "1px solid #999"
                  :box-shadow "inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2)"
                  :box-sizing "border-box"
                  :-webkit-font-smoothing "antialiased"
                  :-moz-osx-font-smoothing "grayscale"}

                 ".new-todo"
                 {:padding "16px 16px 16px 60px"
                  :height "65px"
                  :border "none"
                  :background "rgba(0, 0, 0, 0.003)"
                  :box-shadow "inset 0 -2px 1px rgba(0,0,0,0.03)"}

                 ".main"
                 {:position "relative"
                  :z-index 2
                  :border-top "1px solid #e6e6e6"}

                 ".toggle-graph"
                 {:float "left"
                  :margin-left "16px"
                  :cursor "pointer"
                  :position "relative"
                  :z-index 1}

                 ".toggle-graph svg"
                 {:height "20px"
                  :width "20px"}

                 ".toggle-graph svg path"
                 {:fill "#777"}

                 ".toggle-graph.active svg path, .toggle-graph:hover svg path, .toggle-graph:focus svg path"
                 {:fill "#000"}

                 "button"
                 {:margin 0
                  :padding 0
                  :border 0
                  :background "none"
                  :font-size "100%"
                  :vertical-align "baseline"
                  :font-family "inherit"
                  :font-weight "inherit"
                  :color "inherit"
                  :appearance "none"}

                 ".toggle-all"
                 {:width "1px"
                  :height "1px"
                  :border "none"
                  :opacity "0"
                  :position "absolute"
                  :right "100%"
                  :bottom "100%"}
                 ".toggle-all + label"
                 {:display "flex"
                  :align-items "center"
                  :justify-content "center"
                  :width "45px"
                  :height "65px"
                  :font-size "0"
                  :position "absolute"
                  :top "-65px"
                  :left "0"}

                 ".toggle-all + label:before"
                 {:content "'❯'"
                  :display "inline-block"
                  :font-size "22px"
                  :color "#949494"
                  :padding "10px 27px 10px 27px"
                  :-webkit-transform "rotate(90deg)"
                  :transform "rotate(90deg)"}

                 ".toggle-all:checked + label:before"
                 {:color "#737373"}

                 ".todo-list"
                 {:margin "0"
                  :padding "0"
                  :list-style "none"}

                 ".todo-list li"
                 {:position "relative"
                  :font-size "24px"
                  :border-bottom "1px solid #ededed"}

                 ".todo-list li:last-child"
                 {:border-bottom "none"}

                 ".todo-list li.editing"
                 {:border-bottom "none"
                  :padding "0"}

                 ".todo-list li.editing .edit"
                 {:display "block"
                  :width "calc(100% - 43px)"
                  :padding "12px 16px"
                  :margin "0 0 0 43px"}

                 ".todo-list li.editing .view"
                 {:display "none"}

                 ".todo-list li .toggle"
                 {:text-align "center"
                  :width "40px"
                  :height "auto"
                  :position "absolute"
                  :top "0"
                  :bottom "0"
                  :margin "auto 0"
                  :border "none"
                  :-webkit-appearance "none"
                  :appearance "none"
                  :opacity 0}

                 ".todo-list li .toggle + label"
                 {:background-image "url('data:image/svg+xmlutf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23949494%22%20stroke-width%3D%223%22/%3E%3C/svg%3E')"
                  :background-repeat "no-repeat"
                  :background-position "center left"}

                 ".todo-list li .toggle:checked + label"
                 {:background-image "url('data:image/svg+xmlutf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%2359A193%22%20stroke-width%3D%223%22%2F%3E%3Cpath%20fill%3D%22%233EA390%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22%2F%3E%3C%2Fsvg%3E')"}

                 ".todo-list li label"
                 {:overflow-wrap "break-word"
                  :padding "15px 15px 15px 60px"
                  :display "block"
                  :line-height 1.2
                  :transition "color 0.4s"
                  :font-weight 400
                  :color "#484848"}

                 ".todo-list li.completed label"
                 {:color "#949494"
                  :text-decoration "line-through"}

                 ".todo-list li .destroy"
                 {:display "none"
                  :position "absolute"
                  :top "0"
                  :right "10px"
                  :bottom "0"
                  :width "40px"
                  :height "40px"
                  :margin "auto 0"
                  :font-size "30px"
                  :color "#949494"
                  :transition "color 0.2s ease-out"}

                 ".todo-list li .destroy:hover, .todo-list li .destroy:focus"
                 {:color "#C18585"}

                 ".todo-list li .destroy:after"
                 {:content "'×'"
                  :display "block"
                  :height "100%"
                  :line-height 1.1}

                 ".todo-list li:hover .destroy"
                 {:display "block"}

                 ".todo-list li .edit"
                 {:display "none"}

                 ".todo-list li.editing:last-child"
                 {:margin-bottom "-1px"}

                 ".footer"
                 {:color "#777"
                  :padding "10px 15px"
                  :height "20px"
                  :text-align "center"
                  :font-size "15px"
                  :border-top "1px solid #e6e6e6"}

                 ".footer:before"
                 {:content "''"
                  :position "absolute"
                  :right "0"
                  :bottom "0"
                  :left "0"
                  :height "50px"
                  :overflow "hidden"
                  :box-shadow "0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6, 0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6, 0 17px 2px -6px rgba(0, 0, 0, 0.2)"}

                 ".todo-count"
                 {:float "left"
                  :text-align "left"}

                 ".todo-count strong"
                 {:font-weight 300}

                 ".filters"
                 {:margin "0"
                  :padding "0"
                  :list-style "none"
                  :position "absolute"
                  :right "0"
                  :left "0"}

                 ".filters li"
                 {:display "inline"}

                 ".filters li a"
                 {:color "#777"
                  :margin "3px"
                  :padding "3px 7px"
                  :text-decoration "none"
                  :border "1px solid transparent"
                  :border-radius "3px"}

                 ".filters li a:hover"
                 {:border-color "#777"}

                 ".filters li a.selected"
                 {:border-color "#CE4646"}

                 ".clear-completed, html .clear-completed:active"
                 {:float "right"
                  :position "relative"
                  :line-height "19px"
                  :text-decoration "none"
                  :cursor "pointer"}

                 ".clear-completed:hover"
                 {:text-decoration "underline"}

                 ".info"
                 {:margin "65px auto 0"
                  :color "#4d4d4d"
                  :font-size "11px"
                  :text-shadow "0 1px 0 rgba(255, 255, 255, 0.5)"
                  :text-align "center"}

                 ".info p"
                 {:line-height 1}

                 ".info a"
                 {:color "inherit"
                  :text-decoration "none"
                  :font-weight 400}

                 ".info a:hover"
                 {:text-decoration "underline"}

;; Hack to remove background from Mobile Safari. Can't use it globally since it destroys checkboxes in Firefox
                 "@media screen and (-webkit-min-device-pixel-ratio:0)"
                 {".toggle-all, .todo-list li .toggle"
                  {:background "none"}

                  ".todo-list li .toggle"
                  {:height "40px"}}

                 "@media (max-width: 430px)"
                 {".footer"
                  {:height "50px"}

                  ".filters"
                  {:bottom "10px"}}

                 "@media (max-width 430px)"
                 {".footer"
                  {:height "50px"}

                  ".filters"
                  {:bottom "10px"}}

                 ":focus, .toggle:focus + label, .toggle-all:focus + label"
                 {:box-shadow "0 0 2px 2px #CF7D7D"
                  :outline 0}

                ;; Base stylesheet

                 "hr"
                 {:margin "20px 0"
                  :border 0
                  :border-top "1px dashed #c5c5c5"
                  :border-bottom "1px dashed #f7f7f7"}

                 ".learn a"
                 {:font-weight "normal"
                  :text-decoration "none"
                  :color "#b83f45"}

                 ".learn a:hover"
                 {:text-decoration "underline"
                  :color "#787e7e"}

                 ".learn h3, .learn h4, .learn h5"
                 {:margin "10px 0"
                  :font-weight 500
                  :line-height 1.2
                  :color "#000"}

                 ".learn h3"
                 {:font-size "24px"}

                 ".learn h4"
                 {:font-size "18px"}

                 ".learn h5"
                 {:margin-bottom 0
                  :font-size "14px"}

                 ".learn ul"
                 {:padding 0
                  :margin "0 0 30px 25px"}

                 ".learn li"
                 {:line-height "20px"}

                 ".learn p"
                 {:font-size "15px"
                  :font-weight 300
                  :line-height 1.3
                  :margin-top 0
                  :margin-bottom 0}

                 "#issue-count"
                 {:display "none"}

                 ".quote"
                 {:border "none"
                  :margin "20px 0 60px 0"}

                 ".quote p"
                 {:font-style "italic"}

                 ".quote p:before"
                 {:content "'“'"
                  :font-size "50px"
                  :opacity 0.15
                  :position "absolute"
                  :top "-20px"
                  :left "3px"}

                 ".quote p:after"
                 {:content "'”'"
                  :font-size "50px"
                  :opacity 0.15
                  :position "absolute"
                  :bottom "-42px"
                  :right "3px"}

                 ".quote footer"
                 {:position "absolute"
                  :bottom "-40px"
                  :right 0}

                 ".quote footer img"
                 {:border-radius "3px"}

                 ".quote footer a"
                 {:margin-left "5px"
                  :vertical-align "middle"}

                 ".speech-bubble"
                 {:position "relative"
                  :padding "10px"
                  :background "rgba(0, 0, 0, 0.04)"
                  :border-radius "5px"}

                 ".speech-bubble:after"
                 {:content "''"
                  :position "absolute"
                  :top "100%"
                  :right "30px"
                  :border "13px solid transparent"
                  :border-top-color "rgba(0, 0, 0, 0.04)"}

                 ".learn-bar ) .learn"
                 {:position "absolute"
                  :width "272px"
                  :top "8px"
                  :left "-300px"
                  :padding "10px"
                  :border-radius "5px"
                  :background-color "rgba(255, 255, 255, .6)"
                  :transition-property "left"
                  :transition-duration "500ms"}

                 "@media (min-width 899px)"
                 {".learn-bar"
                  {:width "auto"
                   :padding-left "300px"}

                  ".learn-bar ) .learn"
                  {:left "8px"}}})

         (body
          (section {:class "todoapp"}
                   (header {:class "header"}
                           (h1 "todos")
                           (input {:class "new-todo" :placeholder "What needs to be done?" :autofocus true}))
                   (main {:class "main"}
                         (div {:class "toggle-all-container"}
                              (input {:class "toggle-all" :type "checkbox"})
                              (label {:class "toggle-all-label" :for "toggle-all"} "Mark all as complete")
                              (ul {:class "todo-list"}))
                         (footer {:class "footer"}
                                 (span {:class "todo-count"})
                                 (ul {:class "filters"}
                                     (li (a {:href "#/" :class "selected"} "All"))
                                     (li (a {:href "#/active"} "Active"))
                                     (li (a {:href "#/completed"} "Completed")))
                                 (button {:class "clear-completed"} "Clear completed"))))

          (footer {:class "info"}
                  (p "Double-click to edit a todo")
                  (p "Created by the TodoMVC Team")
                  (p (str "Part of" (a {:href "http://todomvc.com"} "TodoMVC"))))

          (script {:type "module"} ((var todos [])
                                    (var filterCompleted nil)
                                    (var storageKey "todos-ensemble")

                                    (var newTodo (document.querySelector "#new-todo"))
                                    (var toggleAll (document.querySelector "#toggle-all"))
                                    (var todoList (document.querySelector "#todo-list"))
                                    (var footer (document.querySelector "#footer"))
                                    (var todoCount (document.querySelector "#todo-count"))
                                    (var clearCompleted (document.querySelector "#clear-completed"))

                                    (console.log newTodo)

        ;; (var App (function 

        ;; ))
                                    ))))))