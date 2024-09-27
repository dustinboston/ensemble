; Binet's formula
; @see https://en.wikipedia.org/wiki/Binet_equation

(var binet (function (n) (const [sqrt5 (Math.sqrt 5)
                                 phi (/ (+ 1 sqrt5) 2)
                                 psi (/ (- 1 sqrt5) 2)]
                                (Math.round (/ ((Math.pow phi n) - (Math.pow psi n)) sqrt5)))))

(console.log (binet 7)) ; 13