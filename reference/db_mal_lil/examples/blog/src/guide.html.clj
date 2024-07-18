{:title "Lisp Style Rules"
 :date nil 
 :body [(style {".indent" {:margin-left "1em" :text-indent 0}})

        (h1 "Riastradh's Lisp Style Rules")
        (blockquote {:cite "http://mumble.net/~campbell/scheme/style.txt"}
                    (p "Copyright (C) 2007-2011 Taylor R. Campbell")
                    (p "CC BY-NC-SA 3.0")
                    (p "This work is licensed under a Creative Commons" (br)
                       "Attribution-NonCommercial-ShareAlike 3.0 Unported License:" (br)
                       "<http://creativecommons.org/licenses/by-nc-sa/3.0/>."))

        (p "This is a brief summary of" 
           (a {:href "http://mumble.net/~campbell/scheme/style.txt"}
              "Riatradh's comprehensive Lisp style-guide.") ".")

        (h2 "1. Formatting and Indentation")
        (ul (li "Use spaces, not tabs, for indentation.")
            (li "Indentation levels should be two spaces.")
            (li "Align code to reflect its logical structure."))

        (h2 "2. Parentheses Handling")
        (ul (li "Don't put spaces immediately inside parentheses.")
            (li "Put closing parens on the same line as the last element"))


        (h2 "3. Line Length and Wrapping")
        (ul (li "Lines should be kept to a reasonable length."))

        (h2 "4. Naming Conventions")
        (ul (li "Use kebab-case for variables, functions, etc.")
            (li "Names should describe their the purpose or function."))

        (h2 "5. Comments and Documentation")
        (ul (li "Use comments to to explain \"why\" not \"how\".")
            (li "Use comments to mark sections or important items."))

        (h2 "6. Function Definitions and Calls")
        (ul (li "List function parameters on the same line as the function name.")
            (li "If arguments must be wrapped, align with the first argument."))

        (h2 "7. Use of White Space")
        (ul (li "Use white space around operators and after commas")
            (li "Avoid excessive white space within a line"))

        (h2 "8. Conditional Expressions")
        (ul (li "Use cond instead of nested if statements.")
            (li "Keep the test expressions simple.")
            (li "Visually align the consequent expressions."))

        (h2 "9. Macro Definitions")
        (ul (li "Use macros sparingly (when it has a clear advantage over a fn).")
            (li "Use kebab-case for naming."))

        (h2 "10. Data Structures")
        (ul (li "Prefer lists and cons cells for simple data structures")
            (li "Use vectors and maps where perf. or clarity benefits."))

        (h2 "11. Error Handling and Signals")
        (ul (li "Be explicit about error handling.")
            (li "Use conditions/signals to manage them."))
        ]}

