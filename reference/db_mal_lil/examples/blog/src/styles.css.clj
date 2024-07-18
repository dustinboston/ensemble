{"@import './norm.css';" nil

 "html" 
 {:font-size "16px" 
  :line-height "24px"
  :box-sizing "border-box"}

 "*, *:before, *:after" 
 {:box-sizing "inherit"}

 "body"  
 {:font-size "1rem" 
  :background-color "#fffffc"
  :color "#212121"
  :padding "4rem"
  :line-height "1.5"}

 "h1" 
 { :font-size "1.75rem"
  :line-height "3rem"
  :margin-top "1.5rem"
  :margin-bottom "1.5rem"}

 "h2" 
 { :font-size "1.4375rem" 
  :line-height "1.5rem"
  :margin-top "1.5rem"
  :margin-bottom "1.5rem"}

 "h3" 
 { :font-size "1.1875rem "
  :line-height "1.5rem"
  :margin-top "1.5rem"
  :margin-bottom "1.5rem" }

 "small" 
 {:font-size "0.833em"}

 "@media screen and (min-width: 43.75rem)" 
 {:main 
  {:max-width "35rem" }}

 "blockquote" 
 {:margin-left "0"
  :margin-right "0"
  :padding-left "1.5rem"
  :padding-right "1.5rem"
  :background "#f9f9f9"}

 "ul, ol, dt" 
 {:padding-left "1.5rem"
  :padding-right "0"}

 "p + p" 
 {:margin-top "-1.5rem"
  :text-indent "1.5em"}

 "hr" 
 {:border "none"
  :margin-top "1.5rem"
  :margin-bottom "1.5rem"}

 "hr + p" 
 {:margin-top "0"}

 "p, ul, ol, pre, table, blockquote" 
 {:margin-top "0rem"
  :margin-bottom "1.5rem"}

 "blockquote" 
 { :padding-top "1.5rem"
  :padding-bottom "1.5rem" }

 "blockquote > *:first-child" 
 { :margin-top "0" }

 "blockquote > *:last-child" 
 { :margin-bottom "0" }

 "ul ul, ol ol, ul ol, ol ul" 
 {:margin-top "0rem"
  :margin-bottom "0rem"}

 "a, b, i, strong, em, small, code" 
 {:line-height "0" }

 "sub, sup" 
 {:line-height "0"
  :position "relative"
  :vertical-align "baseline" }

 "sup "
 {:top "-0.5em"}

 "sub" 
 {:bottom "-0.25em"}

 "a:hover" 
 {:color "red !important"
  :text-decoration "underline !important"}}
