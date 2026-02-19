import { Calendar, Clock, Users, MapPin } from 'lucide-react';

export default function CourseTimeSlots() {
  const slots = [
    {
      id: 1,
      course: "Elementary Science Experiments",
      level: "Elementary",
      times: ["Mon & Wed 4:00 PM", "Sat 10:00 AM"],
      capacity: "8-12 students",
      location: "On-site & Online",
      image: "https://images.pexels.com/photos/3825517/pexels-photo-3825517.jpeg?auto=compress&cs=tinysrgb&w=1600"
    },
    {
      id: 2,
      course: "Junior High Math Talent",
      level: "Junior High",
      times: ["Tue & Thu 5:00 PM", "Sun 2:00 PM"],
      capacity: "6-10 students",
      location: "On-site & Online",
      image: "https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg?auto=compress&cs=tinysrgb&w=1600"
    },
    {
      id: 3,
      course: "High School AP Classes",
      level: "Advanced",
      times: ["Mon & Wed 6:30 PM", "Sat 1:00 PM"],
      capacity: "10-15 students",
      location: "On-site & Online",
      image: "https://images.pexels.com/photos/4876710/pexels-photo-4876710.jpeg?auto=compress&cs=tinysrgb&w=1600"
    },
    {
      id: 4,
      course: "Online Live Interactive",
      level: "Flexible",
      times: ["Daily 3:00-4:00 PM", "Evening 7:00-8:00 PM"],
      capacity: "Unlimited",
      location: "Online Only",
      image: "https://images.pexels.com/photos/3808517/pexels-photo-3808517.jpeg?auto=compress&cs=tinysrgb&w=1600"
    },
    {
      id: 5,
      course: "Math Elite Training",
      level: "Competition",
      times: ["Tue & Thu 4:30 PM", "Sat 3:00 PM"],
      capacity: "5-8 students",
      location: "On-site & Online",
      image: "https://images.pexels.com/photos/5632401/pexels-photo-5632401.jpeg?auto=compress&cs=tinysrgb&w=1600"
    },
    {
      id: 6,
      course: "Comprehensive English",
      level: "Language",
      times: ["Mon & Fri 4:00 PM", "Sun 11:00 AM"],
      capacity: "8-12 students",
      location: "On-site & Online",
      image: "https://images.pexels.com/photos/3778918/pexels-photo-3778918.jpeg?auto=compress&cs=tinysrgb&w=1600"
    }
  ];

  return (
    <section id="slots" className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">Course Time Slots</h2>
          <p className="text-base md:text-lg lg:text-xl text-gray-600">Find the perfect schedule that fits your needs</p>
        </div>

        <div className="space-y-4">
          {slots.map((slot) => (
            <div
              key={slot.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-100"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
                <div className="h-32 md:h-auto md:min-h-32 overflow-hidden">
                  <img
                    src={slot.image}
                    alt={slot.course}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="md:col-span-3 p-4">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">
                        {slot.course}
                      </h3>
                      <span className="inline-block text-sm font-semibold text-white bg-blue-600 px-3 py-1 rounded-full">
                        {slot.level}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="flex items-start gap-3">
                      <Clock size={20} className="text-blue-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-sm text-gray-500 font-semibold mb-1">Schedule</p>
                        <div className="space-y-1">
                          {slot.times.map((time, idx) => (
                            <p key={idx} className="text-gray-700">{time}</p>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Users size={20} className="text-blue-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-sm text-gray-500 font-semibold mb-1">Class Size</p>
                        <p className="text-gray-700">{slot.capacity}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin size={20} className="text-blue-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-sm text-gray-500 font-semibold mb-1">Format</p>
                        <p className="text-gray-700">{slot.location}</p>
                      </div>
                    </div>
                  </div>

                  <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
                    Register for Class
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-blue-50 rounded-lg p-6 border border-blue-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Can't find your preferred time?</h3>
          <p className="text-gray-700 mb-6">
            We offer flexible scheduling options and can arrange custom class times for groups. Contact us to discuss personalized scheduling.
          </p>
          <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
            Request Custom Schedule
          </button>
        </div>
      </div>
    </section>
  );
}
