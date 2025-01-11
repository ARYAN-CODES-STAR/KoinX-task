export default function TeamPage() {
  const teamMembers = [
    {
      name: "John Smith",
      designation: "Designation here",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Team_page-d4mGYKz50kL89i6VxAxFjkhO9TMzL5.png",
      description:
        "Lorem ipsum dolor sit amet consectetur. In justo rutrum sit sit fermentum ut libero hendrerit id. Tellus sit ornare netus sagittis in nunc convallis mattis maecenas. Tempus arcu leo sociis laoreet nec neque sed pellentesque viverra. Consectetur proin amet ut id facilisi quis consectetur. Tellus gravida ultricies feugiat sed eu egestas dolor est ipsum. Malesuada etiam mi gravida praesent interdu",
    },
    {
      name: "Elina Williams",
      designation: "Designation here",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Team_page-d4mGYKz50kL89i6VxAxFjkhO9TMzL5.png",
      description:
        "Lorem ipsum dolor sit amet consectetur. In justo rutrum sit sit fermentum ut libero hendrerit id. Tellus sit ornare netus sagittis in nunc convallis mattis maecenas. Tempus arcu leo sociis laoreet nec neque sed pellentesque viverra. Consectetur proin amet ut id facilisi quis consectetur. Tellus gravida ultricies feugiat sed eu egestas dolor est ipsum. Malesuada etiam mi gravida praesent interdu",
    },
    {
      name: "John Smith",
      designation: "Designation here",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Team_page-d4mGYKz50kL89i6VxAxFjkhO9TMzL5.png",
      description:
        "Lorem ipsum dolor sit amet consectetur. In justo rutrum sit sit fermentum ut libero hendrerit id. Tellus sit ornare netus sagittis in nunc convallis mattis maecenas. Tempus arcu leo sociis laoreet nec neque sed pellentesque viverra. Consectetur proin amet ut id facilisi quis consectetur. Tellus gravida ultricies feugiat sed eu egestas dolor est ipsum. Malesuada etiam mi gravida praesent interdu",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">Team</h1>

      <p className="mb-8 text-gray-600">
        Lorem ipsum dolor sit amet consectetur. Id consequat adipiscing arcu
        nibh. Eget mattis in mi integer sit egestas. Proin tempor id pretium
        quam. Facilisis purus convallis quam augue.
      </p>

      <div className="space-y-4">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="bg-[#F8FAFC] rounded-lg p-6 flex flex-col md:flex-row gap-6 items-start"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-24 h-24 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-1">{member.name}</h2>
              <p className="text-gray-500 text-sm mb-4">{member.designation}</p>
              <p className="text-gray-600 leading-relaxed">
                {member.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
