type Props = {
    title: string
    onClick?: () => void
};
export const Buttons = ({title, onClick}: Props) => {
    return <button onClick={onClick}>{title}</button>
};