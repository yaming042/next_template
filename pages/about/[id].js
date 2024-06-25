import { useRouter } from "next/router";

export default props => {
    const router = useRouter();

    return (
        <div>ID:{router.query.id}</div>
    )
}
