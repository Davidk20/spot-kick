import { Link } from 'react-router-dom';

function HomeView() {

  return (
    <div className="
      flex flex-col justify-center items-center gap-y-8
    ">
      <span className="text-5xl text-green-600">Higher or Lower</span>
      <Link to="/game" >
        <button className="
          bg-green-700 text-neutral-300 font-bold rounded-xl border-white border-2
          text-3xl px-10 py-2
        ">
          play
        </button>
      </Link>

    </div>
  )
}

export default HomeView;
