{:title "index" 
 :date nil 
 :body (=> (posts)
           (apply ul
                  (map (=> (post)
                           (if (&& (=== (get post :ext) "html.clj") 
                                   (!== (get post :slug) "index"))
                             ((li (a {:href (str (get post :slug) ".html")}
                                     (get post :slug))))))
                       posts)))}
