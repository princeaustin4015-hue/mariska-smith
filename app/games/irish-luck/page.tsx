import IrishLuckGame from '@/components/games/IrishLuckGame';

export default function IrishLuckPage() {
    return (
        <div className="min-h-screen bg-[#0b0604] py-20">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl text-white text-center mb-10 font-cursive">Irish Luck Slot Machine</h1>
                <IrishLuckGame />
            </div>
        </div>
    );
}
