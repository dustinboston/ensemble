(var configuration (do {:src "./examples/blog/src"
                        :out "./examples/blog/out"
                        :title "maladjustment"}))

(var files (readir (get configuration :src)))

(var read-file 
  (function (file) 
       (eval (read-string (str (slurp file))))))

(var tpl 
  (function (data)
       (doctype {:html nil}
                (html {:lang "en"}
                      (head (title (str (get configuration :title) ": " (get data :title)))
                            (link {:href "./styles.css" :rel "stylesheet"}))
                      (body (header (a {:href "./index.html" 
                                        :title "back to index"
                                        :style {:font-weight "bold" 
                                                :position "absolute"
                                                :top "0"
                                                :left "0"
                                                :color "#333"
                                                :padding "2rem"}}
                                       (get configuration :title)))
                            (main (h1 (get data :title))
                                  (if (get data :date) 
                                    (div (time (get data :date))) nil)
                                  (const (post-body (get data :body))
                                    ((if (fn? post-body) 
                                       (post-body files) 
                                       post-body)))))))))

(var make-html
  (function (file contents)
       (const [templated (html-str (tpl contents))
              out-path (str (get configuration :out) "/" 
                            (get file :slug) ".html")]
         (spit out-path templated))))

(var make-css
  (function (file contents)
       (const [css (pr-css contents)
              out-path (str (get configuration :out) "/" 
                            (get file :slug) ".css")]
         (spit out-path css))))

(var handle-file
  (function (file) 
       (const [contents (read-file (str (get configuration :src) "/" 
                                       (get file :name)))]
         (switch (get file :ext) 
                 (list "html.clj" (function () (make-html file contents)))
                 (list "css.clj"  (function () (make-css file contents)))
                 (function () (throw "unhandled file type"))))))

(map handle-file files)
