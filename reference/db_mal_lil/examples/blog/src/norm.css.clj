;;; modern-normalize v2.0.0 | MIT License | https://github.com/sindresorhus/modern-normalize 
(const [default-font-family "system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'"
        monospace-font-family "ui-monospace, SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace"]

       {"*,::before,::after" 
        {:box-sizing "border-box"}

        "html" 
        {:font-family default-font-family 
         :line-height "1.15" 
         :-webkit-text-size-adjust "100%" 
         :-moz-tab-size "4" 
         :tab-size "4"}

        "body" 
        {:margin "0"}

        "hr" 
        {:height "0" 
         :color "inherit"}

        "abbr[title]" 
        {:text-decoration "underline dotted"}

        "b,strong" 
        {:font-weight "bolder"}

        "code,kbd,samp,pre" 
        {:font-family monospace-font-family 
         :font-size "1em"}

        "small" 
        {:font-size "80%"}

        "sub,sup" 
        {:font-size "75%" 
         :line-height "0" 
         :position "relative" 
         :vertical-align "baseline"}

        "sub" 
        {:bottom "-0.25em"}

        "sup" 
        {:top "-0.5em"}

        "table" 
        {:text-indent "0" 
         :border-color "inherit"}})
