// requires three command-line arguments: source, destination, and title

(var source (get (get location :searchParams) :source))
(var destination (get (get location :searchParams) :destination))
(var siteTitle (get (get location :searchParams) :title))

(var files (readir source))
(console.log files)

(var readFile 
     (=> (file) 
         (eval (read-string (str (slurp file))))))

(var template 
  (=> (data)
       (doctype {:html nil}
                (html {:lang "en"}
                      (head (title (str (siteTitle) ": " (get data :title)))
                            (link {:href "./styles.css" :rel "stylesheet"})))
                      (body (header (a {:href "./index.html"}
                                        :style {:font-weight "bold" 
                                                :position "absolute"
                                                :top "1em"
                                                :left "1em"
                                                :color "#fff"
                                                :background "$000"
                                                :padding "2rem"}
                                       (siteTitle)))
                            (main (h1 (get data :title))
                                  (if (get data :date) 
                                    (div (time (get data :date))))
                                  (const (postBody (get data :body))
                                    ((if (fn? postBody) 
                                       (postBody files) 
                                       postBody)))))))))

(var makePage
  (=> (file contents)
       (const [templated (html-str (template contents))
              pagePath (str (destination) "/" 
                            (get file :slug) ".html")]
         (spit pagePath templated))))

(var makeStylesheet 
  (=> (file contents)
       (const [css (pr-css contents)
              stylesheetPath (str (destination) "/"
                                  (get file :slug) ".css")]
         (spit stylesheetPath css))))


// TODO: figure out why the file isn't logging
(var handleFile
  (=> (file) 
       (const [contents (readFile (str (source) "/" (get file :name)))]
              (do (switch (get file :ext) 
                          (list "html.clj" (=> () (makePage file contents)))
                          (list "css.clj"  (=> () (makeStylesheet file contents)))
                          (=> () (throw "unhandled file type")))))))

(map handleFile files)
