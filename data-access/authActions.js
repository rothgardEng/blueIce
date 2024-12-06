
export async function getAdminForCred(email) {
  const admin = await prisma.admin.findFirst({
    where: { email: email },
    select:{
      id:false,
      email:true,
      firstName:false,
      lastName:false,
      // !!!!!!!!!!! NEEED TO CHANGE HOW THIS IS CHECKED ELSEWERE SO CAN SET THIS TO FALSE
      isOverlord:true,
      hashedPassword:true
    }

  });
  await prisma.$disconnect();

  return admin;
}

export async function checkAdmin(id){
  const admin = await prisma.admin.findFirst({
    where: { id: id },
    select:{
      id:true,
      email:false,
      firstName:false,
      lastName:false,
      isOverlord:false,
      hashedPassword:false
    }
  });
  await prisma.$disconnect();

  if (admin) {
    return true;
  } else {
    return false;
  }
}

export async function getAdminName(id){
  const admin = await prisma.admin.findFirst({
    where: { id: id },
    select:{
      id:false,
      email:false,
      firstName:true,
      lastName: true,
      isOverlord:false,
      hashedPassword:false
    }
  });
  await prisma.$disconnect();

  return admin;
}




export async function createAdminDTO(admin) {
  const adminDTO = {
    id: admin.id
  };
  return adminDTO;
}
