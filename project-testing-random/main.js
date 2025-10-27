function init()
{
    const button = document.getElementById('button');
    const input = document.getElementById('input');
    const remove = document.getElementById('button2');
    const donate_span = document.getElementById('donate-span');
    const donate = document.getElementById('donate');
    const list = document.getElementById('list');

    let areaMult = 1;

    let circles = [];

    button.addEventListener('click', () =>{
        addCircle(input.value);
        updateText();
    });

    remove.addEventListener('click', () =>{
        if(confirm("Remove everything?"))
        {
            if (circles.length <= 0)
            {
                list.innerText = 'There was nothing to remove so I added something...';
            }else
            {
                circles = [];
                updateText();
            }
        }else {
            if (circles.length <= 0)
            {
                list.innerText = 'You are lucky there was nothing here. I would have removed it anyways.\n' +
                    'Do you believe in free will?';
            }else
            {
                circles = [];
                list.innerText = 'This code was written by a lazy developer, so I removes anything either way.\n' +
                    'But I added this message to make you feel better.\n' +
                    'Sorry about your circles, though...';
            }

        }
    })

    const donate_listener = () =>{
        donate_span.innerHTML = '<p>Out of legal reasons you cant donate... <button id="but">But...</button></p>';
        document.getElementById('but').addEventListener('click', () =>{
            donate_span.innerHTML = '<p>No really, you can´t! But I have increased the total area of you circles! <button id="back">Ok, sorry...</button></p></p>';
            if (circles.length >= 0)
            {
                areaMult *= 2;
                updateText();
            }
            document.getElementById('back').addEventListener('click', () => {
                donate_span.innerHTML = '<button id="donate">Jetzt spenden!</button>';
                document.getElementById('donate').addEventListener('click', donate_listener)
            })
        })
        };

    donate.addEventListener('click',donate_listener)

    class Circle{
        constructor(radius)
        {
            if (radius === "")
            {
                this.NaC = true;
                this.radius = -1;
            }else
            {
                this.NaC = false;
                this.radius = radius;
            }
        }
        area()
        {
            return Math.PI * Math.pow(this.radius,2);
        }
        toString()
        {
            if (this.NaC)
            {
                return "NaC";
            }
            return "Kreis: " + this.radius + ", " + this.area();
        }
        equals(other)
        {
            return this.radius === other.radius;
        }
    }

    function updateAreaSum()
    {
        if (circles.length <= 0) return 0;

        let sum = 0;
        circles.forEach((circle) =>{
            if (!circle.NaC) sum += circle.area();
        })

        return sum;
    }

    function addCircle(r)
    {
        let c = new Circle(r);

        for (let el of circles)
        {
            if (c.equals(el))
            {
                if (!confirm("This circle is already in the list. Dou you want to add it again?"))
                {
                    return;
                }else
                {
                    break;
                }
            }
        }

        circles.push(new Circle(r));

        circles.sort((a,b) => a.radius - b.radius);
    }

    function updateText()
    {
        let s = '';
        for (const c of circles)
        {
            s += c + "\n";
        }

        const area = updateAreaSum() * areaMult;

        if (area > 0)
        {
            s += "-------------------\n"
            s +=  areaMult <= 1 ? "Total area: " : `Total area (x${areaMult} - because you donated): `;
            s += area;
        }

        list.innerText = s;
    }
}

window.addEventListener('load', init);
