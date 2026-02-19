import { Heart, Lightbulb, Users, Globe, Award, BookOpen } from 'lucide-react';

export default function About() {
  const values = [
    {
      id: 1,
      title: "國際化教育視野",
      description: "培養學生具備國際競爭力，接軌世界頂尖學府的教學標準，讓孩子站在更高的起點展望未來。",
      icon: Globe,
      image: "https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=1600"
    },
    {
      id: 2,
      title: "頂尖師資陣容",
      description: "匯集業界最強師資團隊，每位老師都擁有豐富的教學經驗與專業背景，用心陪伴每一位學生成長。",
      icon: Award,
      image: "https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=1600"
    },
    {
      id: 3,
      title: "薇閣專班課程",
      description: "針對薇閣學生量身打造的專屬課程，完全配合學校進度，讓學生在校內外學習無縫接軌，成績更上一層樓。",
      icon: BookOpen,
      image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=1600"
    }
  ];

  return (
    <section id="about" className="pt-10 md:pt-16 lg:pt-20 pb-6 md:pb-8 lg:pb-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="mb-8 md:mb-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">About 學姐補習班</h2>
          <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl leading-relaxed">
            專注於培養具國際視野的優秀學子，以最強師資團隊、完善的薇閣專班課程，為每位學生打造通往頂尖學府的成功之路。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
          {values.map((value) => {
            const IconComponent = value.icon;
            return (
              <div key={value.id} className="flex flex-col">
                <div className="relative h-24 md:h-32 rounded-lg overflow-hidden mb-3 md:mb-4">
                  <img
                    src={value.image}
                    alt={value.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                  <IconComponent size={24} className="text-blue-600 md:w-8 md:h-8" />
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900">{value.title}</h3>
                </div>
                <p className="text-sm md:text-base lg:text-lg text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 md:p-8 rounded-lg border border-blue-200">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 md:mb-6">我們的使命</h3>
            <p className="text-sm md:text-base text-gray-700 mb-3 md:mb-4 leading-relaxed">
              學姐補習班專注於提供最高品質的教育服務，我們深知每位家長對孩子教育的重視與期待。透過國際化的教學理念、業界最強的師資陣容，以及針對薇閣學生量身打造的專屬課程。
            </p>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              我們不只是補習班，更是孩子成長路上最堅實的後盾。從基礎奠定到進階提升，每一步都用心規劃，讓學生在學業與品格上同步成長。
            </p>
          </div>

          <div>
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 md:mb-6">辦學成果</h3>
            <div className="space-y-4 md:space-y-6">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="text-3xl md:text-4xl font-bold text-blue-600">Top</div>
                <div className="text-base md:text-lg lg:text-xl text-gray-700">頂尖海外留學師資團隊</div>
              </div>
              <div className="flex items-center gap-3 md:gap-4">
                <div className="text-3xl md:text-4xl font-bold text-blue-600">95%</div>
                <div className="text-base md:text-lg lg:text-xl text-gray-700">學生成績PR85以上</div>
              </div>
              <div className="flex items-center gap-3 md:gap-4">
                <div className="text-3xl md:text-4xl font-bold text-blue-600">100%</div>
                <div className="text-base md:text-lg lg:text-xl text-gray-700">薇閣專班進度同步</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
