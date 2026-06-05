"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useState, useEffect } from "react";
import { mockUser } from "@/data/mockUser";
import MyProfileSection from "@/components/myProfile";
import AddressSection from "@/components/address";
import PasswordModal from "@/components/modalPassword";
import AddressModal from "@/components/modalAddress";

export default function ProfilePage() {
  const [fullName, setFullName] = useState(mockUser.fullName);
  const [password, setPassword] = useState(mockUser.password);
  const [gender, setGender] = useState(mockUser.gender);
  const [email, setEmail] = useState(mockUser.email);
  const [addressList, setAddressList] = useState([
    {
      fullName: mockUser.fullName,
      phone: mockUser.phone,
      detail: mockUser.address.detail,
      city: mockUser.address.city,
      zipCode: mockUser.address.zipCode,
      country: mockUser.address.country,
      isDefault: true,
    },
  ]);

  const [isPassModalOpen, setIsPassModalOpen] = useState(false);
  const [isAddrModalOpen, setIsAddrModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newAddress, setNewAddress] = useState({
    fullName: "",
    phone: "",
    country: "",
    city: "",
    zipCode: "",
    detail: "",
  });

  useEffect(() => {
    const savedData = localStorage.getItem("userProfile");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFullName(parsedData.fullName || mockUser.fullName);
      setPassword(parsedData.password || mockUser.password);
      setGender(parsedData.gender || mockUser.gender);
      setEmail(parsedData.email || mockUser.email);
    }
    const savedAddresses = localStorage.getItem("userAddresses");
    if (savedAddresses) {
      setAddressList(JSON.parse(savedAddresses));
    }
  }, []);

  const handleSaveProfile = () => {
    const updatedData = {
      fullName,
      password,
      gender,
      email,
      username: mockUser.username,
    };
    localStorage.setItem("userProfile", JSON.stringify(updatedData));
    alert("บันทึกข้อมูลเรียบร้อยแล้ว!");
  };

  const handlePasswordChange = () => {
    if (oldPassword !== password) return alert("รหัสผ่านเก่าไม่ถูกต้อง!");
    if (newPassword.length < 4) return alert("รหัสผ่านใหม่สั้นเกินไป");
    setPassword(newPassword);
    setIsPassModalOpen(false);
    setOldPassword("");
    setNewPassword("");
    alert("เปลี่ยนรหัสผ่านสำเร็จ!");
  };

  const handleSetDefault = (index: number) => {
    const updatedList = addressList.map((addr, i) => ({
      ...addr,
      isDefault: i === index,
    }));
    setAddressList(updatedList);
    localStorage.setItem("userAddresses", JSON.stringify(updatedList));
  };

  const handleEditClick = (index: number) => {
    setEditingIndex(index);
    setNewAddress(addressList[index]);
    setIsAddrModalOpen(true);
  };

  const handleSaveAddress = () => {
    if (!newAddress.fullName || !newAddress.phone || !newAddress.detail)
      return alert("กรุณากรอกข้อมูลให้ครบถ้วน");

    let updatedList;
    if (editingIndex !== null) {
      updatedList = addressList.map((item, idx) =>
        idx === editingIndex
          ? { ...newAddress, isDefault: item.isDefault }
          : item,
      );
    } else {
      updatedList = [...addressList, { ...newAddress, isDefault: false }];
    }

    setAddressList(updatedList);
    localStorage.setItem("userAddresses", JSON.stringify(updatedList));

    setIsAddrModalOpen(false);
    setEditingIndex(null);
  };

  const handleDeleteAddress = (index: number) => {
    const updatedList = addressList.filter((_, i) => i !== index);
    setAddressList(updatedList);
    localStorage.setItem("userAddresses", JSON.stringify(updatedList));
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-gray-50 text-gray-900">
      <Navbar />
      <main className="container mx-auto flex-grow px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
          <MyProfileSection
            username={mockUser.username}
            fullName={fullName}
            setFullName={setFullName}
            email={email}
            setEmail={setEmail}
            gender={gender}
            setGender={setGender}
            onPasswordChangeClick={() => setIsPassModalOpen(true)}
            onSaveProfile={handleSaveProfile}
          />

          <AddressSection
            addressList={addressList}
            onOpenAddModal={() => {
              setEditingIndex(null);
              setNewAddress({
                fullName: "",
                phone: "",
                country: "",
                city: "",
                zipCode: "",
                detail: "",
              });
              setIsAddrModalOpen(true);
            }}
            onEditClick={handleEditClick}
            onSetDefault={handleSetDefault}
            onDeleteClick={handleDeleteAddress}
          />
        </div>
      </main>

      <PasswordModal
        isOpen={isPassModalOpen}
        onClose={() => setIsPassModalOpen(false)}
        oldPass={oldPassword}
        setOldPass={setOldPassword}
        newPass={newPassword}
        setNewPass={setNewPassword}
        onSave={handlePasswordChange}
      />

      <AddressModal
        isOpen={isAddrModalOpen}
        onClose={() => setIsAddrModalOpen(false)}
        title={editingIndex !== null ? "Edit Address" : "Add New Address"}
        data={newAddress}
        onChange={(e) => {
          const { name, value } = e.target;
          setNewAddress((prev) => ({ ...prev, [name]: value }));
        }}
        onSave={handleSaveAddress}
      />

      <Footer />
    </div>
  );
}
