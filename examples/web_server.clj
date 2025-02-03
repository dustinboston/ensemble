(serve
 (!doctype
  (html {:lang "en"}
        (head
         (meta {:charset "utf-8"})
         (title "Hello, world!")
         (style {} {"html, body" {:margin 0
                                  :padding 0}
                    "body" {:font "14px 1.4em sans-serif"
                            :background "#f5f5f5"
                            :color "#111"
                            :max-width "48em"
                            :margin "2em auto"}}))
        (body
         (div {:class "hero"}
              (h1 (str "Hello, " (span {:id "world"} "world") "!"))
              (form {:id "form"}
                    (input {:type "text" :id "name" :name "name" :placeholder "What's your name?" :aria-label "Name"})
                    (button {:type "submit"} "Say hello!")))
         (script)))))

;; (let [form (Document::querySelector "#form")
;;                        world (Document::querySelector "#world")]
;;                    '(EventTarget.addEventListener form "submit"
;;                                                   (fn [e]
;;                                                     (do
;;                                                       (Event::preventDefault e)
;;                                                       (let [formData (FormData.new (getProp e "target"))
;;                                                             nameValue (FormData::get formData "name")]
;;                                                         (when nameValue
;;                                                           (HTMLElement::textContent world nameValue)))))))
