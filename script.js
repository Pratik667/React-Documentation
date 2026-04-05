document.addEventListener('DOMContentLoaded', function () {
    const tabButtons = document.querySelectorAll('.tab-button');
    const hookSubTabButtons = document.querySelectorAll('#hooks-sub-tabs .sub-tab-button');
    const contentArea = document.getElementById('content-area');
    const hooksSubTabs = document.getElementById('hooks-sub-tabs');
    const assessmentSubTabs = document.getElementById('assessment-sub-tabs');
    const sidebar = document.querySelector('.sidebar');
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const sidebarBackdrop = document.getElementById('sidebar-backdrop');

    function setSidebarOpen(open) {
        if (!sidebar) return;
        sidebar.classList.toggle('open', open);
        if (sidebarBackdrop) sidebarBackdrop.classList.toggle('active', open);
    }

    function closeMobileSidebar() {
        if (window.innerWidth <= 760) {
            setSidebarOpen(false);
        }
    }

    if (mobileToggle) {
        mobileToggle.addEventListener('click', function () {
            const isOpen = sidebar && sidebar.classList.contains('open');
            setSidebarOpen(!isOpen);
        });
    }

    if (sidebarBackdrop) {
        sidebarBackdrop.addEventListener('click', function () {
            setSidebarOpen(false);
        });
    }

    // Content data
    const content = {
        useState: `
            <h1>useState Hook</h1>
            <p>1. useState hook is a state management hook. It holds a state of a particular data. It is used only in functional components.</p>
            <p>2. So the data can come from any place like it can be a prop, it can be some data from an api, or it can be generated through calculation.</p>
            <p>3. It has getter and setter interface. getter actually sets the current value data and setter updates the data.</p>
            <p>4. when any data is updated we think the state is mutated. but no the state is immutable, but the previous state is unmounted and the update data is then set as new state.</p>
            <h3>Syntax</h3>
            <pre><code>const [state, setState] = useState(0);</code></pre>
            <pre><code>graph TD
A[Component] --> B[useState(initialValue)]
B --> C[state = initialValue]
B --> D[setState function]
D --> E[Update state]
E --> F[Re-render component]</code></pre>
        `,
        useReducer: `
            <h1>useReducer Hook</h1>
            <p>The useReducer hook is a built-in React Hook for managing complex state logic in functional components. It's an alternative to useState when your state updates involve multiple sub-values, depend on previous state, or follow predictable patterns</p>
            <pre><code>const [state, dispatch] = useReducer(reducer, initialState, init?);</code></pre>
            <p>init is optional not used mostly</p>
            <p>state : is the getter method</p>
            <p>initialstate : is the default state</p>
            <p>dispatch : is the action which is dispatched</p>
            <p>reducer: is the function which performs operation</p>
            <h3>How It Works</h3>
            <p>You define a reducer function outside the component (pure, no side effects).</p>
            <p>Call useReducer to get state and dispatch.</p>
            <p>Trigger updates with dispatch({ type: 'ACTION_TYPE', payload: ... }).</p>
            <p>Reducer computes new state based on current state and action.</p>
            <p>React re-renders with the new state.</p>
            <p>when to use it over useState:</p>
            <ul>
                <li>Complex state, State transitions depend on previous state, Multiple related actions/updates : Yes (switch on action.type), Shared logic across components : Yes (extract reducer for reuse)</li>
            </ul>
            <h3>Example</h3>
            <pre><code>const themes = {
    light: {
        color: '#2d3436',
        background: '#81ecec',
        fontfamily: 'Arial, sans-serif'
    },
    party:{
        color: '#81ecec',
        background: '#6c5ce7',
        fontfamily: 'Comic Sans MS, cursive, sans-serif'
    },
    adrenaline:{
         color: '#9c88ff',
        background: '#192a56',
        fontfamily: 'Impact, Charcoal, sans-serif'
    },
    sober:{
          color: '#2f3542',
        background: '#ffffff',
        fontfamily: 'Georgia, serif'
    }
}

const reducer = (state, action) => {
    switch(action.type){
        case 'LIGHT':
            return themes.light;
        case 'PARTY':
            return themes.party;
        case 'ADRENALINE':
            return themes.adrenaline;
        case 'SOBER':
            return themes.sober;
        default:
            return state;
    }
}

function App() {
  const [theme, dispatch] = useReducer(reducer, themes.light);
  console.log(theme);
   const handleTheme = (theme) => {
        dispatch({type: theme});
    }
  return (
    &lt;section className="app" style={{color: theme.color, background: theme.background, fontFamily: theme.fontfamily}}&gt;
      &lt;section className='theme-switcher'&gt;
        &lt;span&gt;Theme Switcher&lt;/span&gt;
        &lt;ul&gt;
          &lt;li&gt;&lt;button id="light-btn" onClick={() => handleTheme('LIGHT')}&gt;Light Mode&lt;/button&gt;&lt;/li&gt;
          &lt;li&gt;&lt;button id="enjoy-btn" onClick={() => handleTheme('PARTY')}&gt;Party Mode&lt;/button&gt;&lt;/li&gt;
          &lt;li&gt;&lt;button id="adrenaline-btn" onClick={() => handleTheme('ADRENALINE')}&gt;Adrenaline Mode&lt;/button&gt;&lt;/li&gt;
          &lt;li&gt;&lt;button id="sober-btn" onClick={() => handleTheme('SOBER')}&gt;Sober Mode&lt;/button&gt;&lt;/li&gt;
        &lt;/ul&gt;
      &lt;/section&gt;
      &lt;div class="container"&gt;
        &lt;h1&gt;Welcome to Our Platform&lt;/h1&gt;
        &lt;p&gt;This platform is designed to help users explore modern web technologies...&lt;/p&gt;
      &lt;/div&gt;
    &lt;/section&gt;
  )
}</code></pre>
            <pre><code>graph TD
A[Component] --> B[useReducer(reducer, initialState)]
B --> C[state]
B --> D[dispatch]
D --> E[Action]
E --> F[Reducer]
F --> G[New State]
G --> H[Re-render]</code></pre>
        `,
        useLayoutEffect: `
            <h1>useLayoutEffect Hook</h1>
            <p>The useLayoutEffect hook is a React Hook that lets you run side effects synchronously right after React has performed all DOM mutations (updates), but before the browser paints the new changes to the screen.</p>
            <pre><code>useLayoutEffect(() => {
  // Your effect code here

  return () => {
    // Optional cleanup code
  };
}, [dependencies]);</code></pre>
            <h3>Key Difference: Timing Compared to useEffect</h3>
            <p>useEffect: After render and after browser paint. User may see a flash or intermediate state.</p>
            <p>useLayoutEffect: After render but before browser paint. Prevents visual inconsistencies by blocking paint until the effect is complete.</p>
            <p>This timing makes useLayoutEffect perfect for cases where you need to measure or manipulate the DOM immediately after an update, preventing visual flickering or layout jumps.</p>
            <h3>Visual Timeline:</h3>
            <ul>
                <li>React renders (computes new virtual DOM)</li>
                <li>React applies DOM mutations (updates real DOM)</li>
                <li>useLayoutEffect runs ← synchronous, blocks painting</li>
                <li>Browser paints the screen (user sees final result)</li>
                <li>useEffect runs ← asynchronous, after paint</li>
            </ul>
            <h3>When to Use useLayoutEffect</h3>
            <p>Use it when your effect depends on reading or writing DOM layout information (like sizes, positions, scroll positions) and you want to avoid visual glitches.</p>
            <h3>Summary</h3>
            <p>useLayoutEffect: Runs synchronously after DOM updates, before paint.</p>
            <p>Use it for: DOM measurements, layout adjustments, preventing visual flicker.</p>
            <p>Avoid it for: Data fetching, timers, subscriptions — prefer useEffect.</p>
            <p>It's the tool to reach for when you think: "I need the DOM to be in its final state before the user sees it."</p>
            <pre><code>sequenceDiagram
participant React
participant DOM
participant Browser
participant useLayoutEffect
participant useEffect
React->>DOM: Apply mutations
React->>useLayoutEffect: Run synchronously
useLayoutEffect-->>Browser: Block paint
Browser->>Browser: Paint screen
useEffect->>useEffect: Run asynchronously</code></pre>
        `,
        useEffect: `
            <h1>useEffect Hook</h1>
            <p>The useEffect hook is one of the most commonly used React Hooks. It allows you to perform side effects in functional components—things like data fetching, subscriptions, manually manipulating the DOM, timers, or logging.</p>
            <p>It replaces lifecycle methods from class components:</p>
            <ul>
                <li>componentDidMount</li>
                <li>componentDidUpdate</li>
                <li>componentWillUnmount</li>
            </ul>
            <pre><code>useEffect(() => {
  // Effect code (runs after render)

  return () => {
    // Optional cleanup (runs before next effect or unmount)
  };
}, [dependencies]); // Dependency array (controls when effect runs)</code></pre>
            <h3>Timing: When Does useEffect Run?</h3>
            <p>useEffect runs asynchronously after the browser has painted the screen (after render and layout). This prevents blocking the UI.</p>
            <h3>Dependency Array: Controlling When It Runs</h3>
            <ul>
                <li>No array: useEffect(() => {...})  : Runs after every render (like componentDidUpdate without conditions)</li>
                <li>Empty: useEffect(() => {...}, []) : Runs only once on mount (like componentDidMount)</li>
                <li>With deps: useEffect(() => {...}, [dep1, dep2]) : Runs on mount and when any dep changes</li>
            </ul>
            <h3>Cleanup Function</h3>
            <p>The optional return function runs:</p>
            <ol>
                <li>Before the next effect (when dependencies change)</li>
                <li>On unmount</li>
            </ol>
            <h3>Summary</h3>
            <p>Use useEffect for any side effect that doesn't need to block painting.</p>
            <p>It's the go-to hook for 90% of side effects in modern React.</p>
            <p>Always manage dependencies and cleanup to avoid bugs.</p>
            <pre><code>graph TD
A[Render] --> B[Browser Paint]
B --> C[useEffect runs]
C --> D[Cleanup on unmount/change]</code></pre>
        `,
        useContext: `
            <h1>useContext Hook</h1>
            <p>The useContext hook is a built-in React Hook that allows functional components to subscribe to and read data from a Context object without manually passing props through every level of the component tree (a problem known as "prop drilling").</p>
            <h3>Core Functionality</h3>
            <p>Purpose: It provides a way to share "global" data, such as the current authenticated user, a UI theme, or preferred language, across many components.</p>
            <p>Mechanism: When a component calls useContext(MyContext), it looks up the component tree to find the nearest matching &lt;MyContext.Provider&gt; and returns its value.</p>
            <p>Re-rendering: React automatically re-renders any component using useContext whenever the provider's value changes.</p>
            <h3>How to Use useContext</h3>
            <p>Implementing context typically involves three main steps:</p>
            <ol>
                <li>Create Context: Use createContext() to initialize a context object.</li>
                <li>Provide Context: Wrap your component tree with a .Provider and pass the data into the value prop.</li>
                <li>Consume Context: Use the useContext hook inside a child component to access the value.</li>
            </ol>
            <h3>Example</h3>
            <pre><code>// App.js
import './App.css';
import Bulb from './lightbulb/Bulb';
import { ColorProvider } from './lightbulb/context';

function App() {
  console.log('App component..');
  return (    
    &lt;ColorProvider&gt;
      &lt;div className="App"&gt;
        &lt;Bulb /&gt;
      &lt;/div&gt;
    &lt;/ColorProvider&gt;
  );
}

export default App;

// Bulb.js
import { ReactComponent as MyIcon } from './buld.svg';
import { useContext } from 'react';
import { colorContext } from './context';

const Bulb = () => {
    const {color, toggleColor} = useContext(colorContext);
    return(
        &lt;&gt;
        &lt;MyIcon fill={color} width={150} height={150} /&gt;
        &lt;button onClick={toggleColor}&gt;
            Click
        &lt;/button&gt;
        &lt;/&gt;
    )
}

export default Bulb;

// context.js
import { createContext, useState } from "react";

export const colorContext = createContext();

export const ColorProvider = ({children}) => {
    const [color, setColor] = useState('white');

    const toggleColor = () => {
        setColor((prev) => (prev === 'white' ? 'yellow' : 'white'));
    }
    return(
        &lt;colorContext.Provider value={{color, toggleColor}}&gt;
            {children}
        &lt;/colorContext.Provider&gt;
    )
}</code></pre>
            <pre><code>graph TD
A[Provider] --> B[Context Value]
B --> C[Child Component]
C --> D[useContext]
D --> E[Access Value]</code></pre>
        `,
        useRef: `
            <h1>useRef Hook</h1>
            <p>useRef is a React Hook that lets you reference a value that's not needed for rendering.</p>
            <p>In React, a Ref is an "escape hatch" that allows you to "remember" information between renders without triggering a new render when that information changes.</p>
            <h3>Basic Usage of useRef</h3>
            <p>To use a ref, call useRef at the top level of your component. It returns a ref object with a single property called current.</p>
            <p>Initialization: const myRef = useRef(initialValue);</p>
            <p>Accessing: Use myRef.current to read or modify the value.</p>
            <p>Persistence: The value in current persists for the entire lifetime of the component.</p>
            <h3>Common Use Cases</h3>
            <ul>
                <li>Manipulating the DOM: Programmatically focusing an input, scrolling to an element, or measuring element size.</li>
                <li>Storing Mutable Values: Use it for data that shouldn't affect the UI, such as timer IDs or socket connections.</li>
                <li>Tracking Previous Values: It can store the value of a prop or state from a previous render for comparison.</li>
            </ul>
            <h3>Best Practices and Caveats</h3>
            <ul>
                <li>Do not read or write ref.current during rendering.</li>
                <li>Ref Forwarding: By default, you cannot pass a ref to your own custom components.</li>
                <li>Avoid overusing: Only use refs when you cannot achieve the result declaratively through props and state.</li>
            </ul>
            <pre><code>graph TD
A[Component] --> B[useRef(initialValue)]
B --> C[ref.current = initialValue]
C --> D[Access/Manipulate DOM]</code></pre>
        `,
        useFormAction: `
            <h1>useFormAction and useFormStatus Hooks</h1>
            <p>useFormAction and useFormStatus are React hooks designed for handling forms with server actions, especially in frameworks like Next.js (App Router).</p>
            <h3>useFormStatus</h3>
            <p>useFormStatus lets you track the status of a form submission (e.g., pending, success, etc.) from inside a component.</p>
            <pre><code>import { useFormStatus } from 'react-dom';</code></pre>
            <p>Key feature: pending: true when the form is being submitted</p>
            <h3>useFormAction</h3>
            <p>useFormAction allows you to trigger a form action programmatically instead of relying only on &lt;form action={...}&gt;.</p>
            <pre><code>import { useFormAction } from 'react-dom';</code></pre>
            <p>Use cases: Trigger server actions without a traditional form submit, custom UI interactions.</p>
            <pre><code>graph TD
A[Form] --> B[useFormStatus]
B --> C[pending state]
A --> D[useFormAction]
D --> E[Trigger action]</code></pre>
        `,
        useTransition: `
            <h1>useTransition Hook</h1>
            <p>useTransition lets you tell React: "This update is not urgent. If something more important happens, feel free to pause this."</p>
            <p>useTransition hook is basically a hook which is related to making ui more responsive helps in optimize performance.</p>
            <p>React treats all state updates as urgent updates and resolves them on priority.</p>
            <p>useTransition hook differentiates urgent and non-urgent state updates.</p>
            <pre><code>const [isPending, startTransition] = useTransition();</code></pre>
            <p>startTransition(fn): Wraps non-urgent state updates</p>
            <p>isPending: true while the transition is in progress</p>
            <h3>When NOT to use useTransition</h3>
            <ul>
                <li>Form inputs themselves</li>
                <li>Hover effects</li>
                <li>Animations</li>
                <li>Anything that must update immediately</li>
            </ul>
            <h3>Example</h3>
            <pre><code>import { useState, useTransition } from "react";

// Fake expensive function
function slowFilter(list, query) {
  // Simulate heavy CPU work
  const start = performance.now();
  while (performance.now() - start < 300) {}

  return list.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );
}

const ITEMS = Array.from({ length: 10000 }, (_, i) => \`Item \${i + 1}\`);

export default function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(ITEMS);

  const [isPending, startTransition] = useTransition();

  function handleChange(e) {
    const value = e.target.value;

    // 🔥 Urgent update (typing must be instant)
    setQuery(value);

    // 🐢 Non-urgent update (heavy computation)
    startTransition(() => {
      setResults(slowFilter(ITEMS, value));
    });
  }

  return (
    &lt;div style={{ padding: 20, fontFamily: "sans-serif" }}&gt;
      &lt;h2&gt;useTransition Demo&lt;/h2&gt;

      &lt;input
        value={query}
        onChange={handleChange}
        placeholder="Type to search..."
        style={{ padding: 8, width: 250 }}
      /&gt;

      {isPending && &lt;p&gt;Filtering results...&lt;/p&gt;}

      &lt;ul&gt;
        {results.slice(0, 50).map((item) => (
          &lt;li key={item}&gt;{item}&lt;/li&gt;
        ))}
      &lt;/ul&gt;

      &lt;p&gt;Showing {results.length} results&lt;/p&gt;
    &lt;/div&gt;
  );
}</code></pre>
            <pre><code>graph TD
A[Urgent Update] --> B[High Priority]
C[Non-Urgent Update] --> D[startTransition]
D --> E[Low Priority]</code></pre>
        `,
    useDeferredValue: `
            <h1>useDeferredValue Hook</h1>
            <p>This is a hook which is used to make UI experience more Responsive helps in optimize performance.</p>
            <p>When you have heavy rendering work followed by an user input.</p>
            <p>Example. Typing in an input that triggers expensive re-renders</p>
            <p>This hook has a single state and it takes in a single input. Unlike useTransition hook which has 2 states a pending and startTransition state.</p>
            <p>But this has the same mechanism like useTransition hook that it sets priority for the state updates.</p>
            <pre><code>const deferredQuery = useDeferredValue(query);</code></pre>
            <p>Urgent lanes: Input changes, clicks, etc.</p>
            <p>Lower-priority (transition/deferred) lanes: Expensive computations like list filtering.</p>
            <h3>Example</h3>
            <pre><code>import { useState, useMemo, useDeferredValue } from 'react';

function App() {
  const [query, setQuery] = useState('');

  // This is the key: deferredQuery "lags behind" during rapid typing
  const deferredQuery = useDeferredValue(query);

  // Generate a large fake dataset (10,000 items) – only once
  const allProducts = useMemo(() => {
    return Array.from({ length: 10000 }, (_, i) => ({
      id: i,
      name: 'Product ' + (i + 1) + ' - Awesome Gadget',
    }));
  }, []);

  // Expensive filtering now depends on the *deferred* query
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) =>
      product.name.toLowerCase().includes(deferredQuery.toLowerCase())
    );
  }, [allProducts, deferredQuery]); // ← depends on deferredQuery, not query

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value); // This is urgent → input updates immediately
    // No need for startTransition – the deferring happens automatically via useDeferredValue
  };

  // Optional: visual feedback to show when results are "stale"
  const isStale = query !== deferredQuery;

  return (
    &lt;div style={{ padding: '20px', fontFamily: 'Arial' }}&gt;
      &lt;h1&gt;Responsive Product Search&lt;/h1&gt;
      &lt;input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search products..."
        style={{ width: '100%', padding: '10px', fontSize: '16px' }}
      /&gt;
      
      {isStale && (
        &lt;p style={{ color: 'gray', fontStyle: 'italic' }}&gt;
          Updating results...
        &lt;/p&gt;
      )}

      &lt;ul style={{ listStyle: 'none', padding: 0, opacity: isStale ? 0.6 : 1, transition: 'opacity 0.2s' }}&gt;
        {filteredProducts.map((product) => (
          &lt;li
            key={product.id}
            style={{ padding: '5px 0', borderBottom: '1px solid #eee' }}
          &gt;
            {product.name}
          &lt;/li&gt;
        ))}
      &lt;/ul&gt;

      &lt;p&gt;{filteredProducts.length} results shown&lt;/p&gt;
    &lt;/div&gt;
  );
}

export default App;</code></pre>
            <pre><code>graph TD
A[Input Change] --> B[Urgent Render]
C[Heavy Computation] --> D[useDeferredValue]
D --> E[Deferred Render]</code></pre>
        `,
    useOptimistic: `
            <h1>useOptimistic Hook</h1>
            <p>useOptimistic is a React Hook that lets you optimistically update the UI.</p>
            <pre><code>const [optimisticState, setOptimistic] = useOptimistic(value, reducer?);</code></pre>
            <p>Parameters:</p>
            <ul>
                <li>value: The value returned when there are no pending Actions.</li>
                <li>optional reducer(currentState, action): The reducer function that specifies how the optimistic state gets updated.</li>
            </ul>
            <p>Returns:</p>
            <ul>
                <li>optimisticState: The current optimistic state.</li>
                <li>The set function that lets you update the optimistic state to a different value inside an Action.</li>
            </ul>
            <h3>Example</h3>
            <pre><code>import { useOptimistic } from 'react';

function MyComponent({age, name, todos}) {
  const [optimisticAge, setOptimisticAge] = useOptimistic(age);
  const [optimisticName, setOptimisticName] = useOptimistic(name);
  const [optimisticTodos, setOptimisticTodos] = useOptimistic(todos, reducer);
}</code></pre>
            <pre><code>graph TD
A[Action] --> B[setOptimistic]
B --> C[Optimistic State Update]
C --> D[UI Updates Immediately]
D --> E[Server Response]
E --> F[Revert if Error]</code></pre>
        `,
    useMemo: `
            <h1>useMemo and useCallback Hooks</h1>
            <p>useMemo and useCallback are two performance optimization hooks in React. They help prevent unnecessary work during re-renders—but they solve slightly different problems.</p>
            <h3>useMemo</h3>
            <p>useMemo memoizes a computed value so it doesn't get recalculated on every render.</p>
            <pre><code>const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);</code></pre>
            <h3>useCallback</h3>
            <p>useCallback memoizes a function so it doesn't get recreated on every render.</p>
            <pre><code>const memoizedFn = useCallback(() => {
  doSomething(a, b);
}, [a, b]);</code></pre>
            <h3>Key Differences</h3>
            <table>
                <tr><th>Feature</th><th>useMemo</th><th>useCallback</th></tr>
                <tr><td>Returns</td><td>Value</td><td>Function</td></tr>
                <tr><td>Purpose</td><td>Cache result of computation</td><td>Cache function reference</td></tr>
                <tr><td>Use case</td><td>Expensive calculations</td><td>Prevent function recreation</td></tr>
            </table>
            <pre><code>graph TD
A[Re-render] --> B{Expensive?}
B -->|Yes| C[useMemo]
B -->|No| D[Normal]
A --> E{Function?}
E -->|Yes| F[useCallback]
E -->|No| D</code></pre>
        `,
    redux: `
            <h1>React Redux</h1>
            <p>React Redux is not Reduxtoolkit but the older or basic version of implementing the redux.</p>
            <p>Where as the newer version of react redux ie v9.x it has some configuration from RTK. Whereas RTK still remains the advanced state management library.</p>
            <p>It has a store, actions, reducer, dispatch</p>
            <p>like useReducer hook which has just reducer and disapatch clearly mentioned. here we have seperated actions and store.</p>
            <p>reducer function has the core logic of which action type will lead to what action</p>
            <ol>
                <li>dispatch - dispatch will trigger the action type and will go into the reducer function and will set the state based on action type</li>
                <li>actions - it will have the actions clearly mentioned which will have business logic</li>
                <li>Centralized state: store will have stored the state when action type will change the current thing will be there stored.</li>
                <li>provider - lastly the provider method is used to wrap the component so that the redux will be set with in the provider</li>
            </ol>
            <h3>Quick Clarification:</h3>
            <ol>
                <li>React Redux (react-redux package): Only handles connecting React components to a Redux store (e.g., &lt;Provider&gt;, useSelector, useDispatch, connect).</li>
                <li>Redux Toolkit (@reduxjs/toolkit package): Provides tools like createSlice, configureStore, createAsyncThunk for building the store and logic.</li>
            </ol>
            <p>In previous version react-redux what is deprecated</p>
            <ol>
                <li>createStore from react-redux is deprecated now it is using configureStore</li>
                <li>Creating seperate Reducer component and Actions component is also deprecated now it uses slice.</li>
            </ol>
            <pre><code>graph TD
A[Component] --> B[useDispatch]
B --> C[Action]
C --> D[Reducer]
D --> E[New State]
E --> F[Store]
F --> G[useSelector]
G --> H[Component Re-render]</code></pre>
        `
    };

    // Assessment content is loaded from assessment.js

function getAssessmentHtml(setId) {
    if (assessmentLoading) {
        return `<p>Loading practice questions...</p>`;
    }

    const set = assessmentContent[setId];
    if (!set) {
        return `<p>Practice set not found.</p>`;
    }

    let html = `<h1>Practice Set ${setId.replace('set', '')}</h1>`;
    html += `<form id="assessment-form">`;

    set.forEach((question, index) => {
        html += `
            <div class="question-block">
                <p><strong>${index + 1}. ${question.question}</strong></p>`;

        Object.entries(question.options).forEach(([key, option]) => {
            html += `
                <label>
                    <input type="radio" name="q${index}" value="${key}"> ${key}) ${option}
                </label><br>`;
        });

        html += `
            </div>`;
    });

    html += `
            <button type="button" id="assess-button">Assess</button>
            <div id="assessment-result" class="assessment-result"></div>
        </form>`;
    return html;
}

function assessPracticeSet(setId) {
    const set = assessmentContent[setId] || [];
    const results = [];
    let correctCount = 0;

    set.forEach((question, index) => {
        const selected = document.querySelector(`input[name="q${index}"]:checked`);
        const value = selected ? selected.value : null;
        const correct = value === question.answer;

        if (correct) {
            correctCount += 1;
        }

        if (!correct) {
            results.push({
                question: question.question,
                selected: value || 'No answer',
                answer: question.answer,
                answerText: question.options[question.answer]
            });
        }
    });

    const total = set.length;
    const score = total ? Math.round((correctCount / total) * 100) : 0;
    const resultArea = document.getElementById('assessment-result');

    if (resultArea) {
        let resultHtml = `<h2>Assessment result</h2>`;
        resultHtml += `<p><strong>Score:</strong> ${score}% (${correctCount} / ${total})</p>`;

        if (results.length > 0) {
            resultHtml += `<div class="assessment-review"><h3>Review incorrect answers</h3>`;
            results.forEach((item, index) => {
                resultHtml += `
                    <div class="review-item">
                        <p><strong>${index + 1}. ${item.question}</strong></p>
                        <p>Your answer: ${item.selected}</p>
                        <p>Correct answer: ${item.answer}) ${item.answerText}</p>
                    </div>`;
            });
            resultHtml += `</div>`;
        } else {
            resultHtml += `<p>Great work! All answers are correct.</p>`;
        }

        resultArea.innerHTML = resultHtml;
    }
}

function bindAssessmentHandlers(setId) {
    const assessButton = document.getElementById('assess-button');
    if (assessButton) {
        assessButton.addEventListener('click', function () {
            assessPracticeSet(setId);
        });
    }
}

// Function to show content
function showContent(topic, subTopic = null) {
    if (!contentArea) return;

    if (topic === 'hooks' && subTopic) {
        contentArea.innerHTML = content[subTopic] || "<p>Content not found</p>";
    } else if (topic === 'assessment' && subTopic) {
        contentArea.innerHTML = getAssessmentHtml(subTopic);
        bindAssessmentHandlers(subTopic);
    } else if (topic === 'redux') {
        contentArea.innerHTML = content.redux;
    }
}
// Tab button click
tabButtons.forEach(button => {
    button.addEventListener('click', function () {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        const topic = this.dataset.topic;
        if (topic === 'hooks') {
            if (hooksSubTabs) hooksSubTabs.style.display = 'block';
            if (assessmentSubTabs) assessmentSubTabs.style.display = 'none';
            showContent('hooks', 'useState');
        } else if (topic === 'assessment') {
            if (hooksSubTabs) hooksSubTabs.style.display = 'none';
            if (assessmentSubTabs) assessmentSubTabs.style.display = 'block';
            showContent('assessment', 'set1');
        } else {
            if (hooksSubTabs) hooksSubTabs.style.display = 'none';
            if (assessmentSubTabs) assessmentSubTabs.style.display = 'none';
            showContent('redux');
        }

        closeMobileSidebar();
    });
});

// Hook sub-tab button click
hookSubTabButtons.forEach(button => {
    button.addEventListener('click', function () {
        hookSubTabButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        const hook = this.dataset.hook;
        showContent('hooks', hook);
        closeMobileSidebar();
    });
});

// Assessment sub-tab button click
const assessmentSubTabButtons = document.querySelectorAll('#assessment-sub-tabs .sub-tab-button');
assessmentSubTabButtons.forEach(button => {
    button.addEventListener('click', function () {
        assessmentSubTabButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        const set = this.dataset.set;
        showContent('assessment', set);
        closeMobileSidebar();
    });
});

window.addEventListener('assessmentContentLoaded', function () {
    const activeTab = document.querySelector('.tab-button.active');
    if (activeTab && activeTab.dataset.topic === 'assessment') {
        const activeSet = document.querySelector('#assessment-sub-tabs .sub-tab-button.active');
        const setId = activeSet ? activeSet.dataset.set : 'set1';
        showContent('assessment', setId);
    }
});

// Initialize
showContent('hooks', 'useState');
});