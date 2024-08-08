// Returns the Fibonacci number at position `n` in the sequence

(var fibonacci (=> (n)
  (if (<= n 1) n 
    (+ (fibonacci (- n 1)) 
       (fibonacci (- n 2)))))); 

(const (n (stringify (get (get location :searchParams) :n))) 
       (console.log (fibonacci n)))

