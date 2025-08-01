import { redirect } from 'next/navigation';

const Home = () => {
  return redirect("/pedidos/novo");
};

export default Home;
