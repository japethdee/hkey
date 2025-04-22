import { useState, useEffect, useMemo } from "react";
import Navbar from "../components/Navbar";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import "../styles/quotation-page.css";
import { Forward, FolderDown, FolderUp, FilePlus, History, Archive, Filter, Check } from "lucide-react";
import Quote from "../assets/quote.png";
import ChatHead from "../components/ChatHead";
import { motion } from "framer-motion";
import SplashScreen from "../components/SplashScreen";
import splashQuote from "../assets/quo-page.png";

const Quotations = () => {
    const [showSplash, setShowSplash] = useState(true);

        useEffect(() => {
        const timer = setTimeout(() => {
            setShowSplash(false);
        }, 1000);
        return () => clearTimeout(timer);
        }, []);
    const [activeTab, setActiveTab] = useState("quotations");
    
    const [archives, setArchives] = useState([]);
    const [history, setHistory] = useState([]);
    const [submittedBy, setSubmittedBy] = useState("");
    const [sortCriteria, setSortCriteria] = useState(["date"]);

    const [orders, setOrders] = useState([]);
    const [selectedQuotation, setSelectedQuotation] = useState(null);
    const openConvertModal = (quotation) => {
        setSelectedQuotation(quotation);
        setIsConvertModalOpen(true);
    };

    const pageVariants = {
        initial: { opacity: 0, y: 0 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        exit: { opacity: 0, y: 0, transition: { duration: 0.5 } }
    };

    const handleArchive = (quotation) => {
        setQuotations(quotations.filter(q => q.id !== quotation.id));
        setArchives([...archives, quotation]);
        setHistory([...history, { id: Date.now(), description: `User ${quotation.submittedBy} archived File #${quotation.id}`, date: new Date().toLocaleString() }]);
    };
    const handleUnarchive = (quotation) => {
        setArchives(archives.filter(a => a.id !== quotation.id));
        setQuotations([...quotations, quotation]);
        setHistory([...history, { id: Date.now(), description: `User ${quotation.submittedBy} unarchived File #${quotation.id}`, date: new Date().toLocaleString() }]);
    };

    const [tooltip, setTooltip] = useState({ visible: false, left: 0, top: 0, text: "" });
    const showTooltip = (e, text) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setTooltip({
            visible: true,
            left: rect.left + rect.width / 2 - 30,
            top: rect.top - 25,
            text
        });
    };

    const hideTooltip = () => setTooltip({ visible: false, left: 0, top: 0, text: "" });

    
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isConvertModalOpen, setIsConvertModalOpen] = useState(false);

    const closeModal = () => setIsAddModalOpen(false);

    const [quotations, setQuotations] = useState([
        { id: 1, description: "Antibiotics Order", file: "PSALM91.pdf", date: "2025-03-07", status: "Pending", submittedBy: "John Doe", receivedFile: "orders.pdf" },
        { id: 2, description: "Antibiotics Order", file: "order1.pdf", date: "2025-03-07", status: "Pending", submittedBy: "John Doe", receivedFile: "orders.pdf" },
        { id: 3, description: "Antibiotics Order", file: "order1.pdf", date: "2025-03-07", status: "Pending", submittedBy: "John Doe", receivedFile: "orders.pdf" },
        { id: 4, description: "Antibiotics Order", file: "order1.pdf", date: "2025-03-07", status: "Pending", submittedBy: "John Doe", receivedFile: "orders.pdf" },
        { id: 5, description: "Antibiotics Order", file: "order1.pdf", date: "2025-03-07", status: "Pending", submittedBy: "John Doe", receivedFile: "orders.pdf" },
        { id: 6, description: "Antibiotics Order", file: "order1.pdf", date: "2025-03-07", status: "Pending", submittedBy: "John Doe", receivedFile: "orders.pdf" },
        { id: 7, description: "Antibiotics Order", file: "order1.pdf", date: "2025-03-07", status: "Pending", submittedBy: "John Doe", receivedFile: "orders.pdf" },
        { id: 8, description: "Antibiotics Order", file: "order1.pdf", date: "2025-03-07", status: "Pending", submittedBy: "John Doe", receivedFile: "orders.pdf" },
        { id: 9, description: "Antibiotics Order", file: "order1.pdf", date: "2025-03-07", status: "Pending", submittedBy: "John Doe", receivedFile: "orders.pdf" },
        { id: 11, description: "Antibiotics Order", file: "order1.pdf", date: "2025-03-07", status: "Pending", submittedBy: "John Doe", receivedFile: "orders.pdf" },
        { id: 12, description: "Antibiotics Order", file: "order1.pdf", date: "2025-03-07", status: "Pending", submittedBy: "John Doe", receivedFile: "orders.pdf" },
        { id: 13, description: "Antibiotics Order", file: "order1.pdf", date: "2025-03-07", status: "Pending", submittedBy: "John Doe", receivedFile: "orders.pdf" },
        { id: 14, description: "Vitamins Supply", file: "order2.pdf", date: "2025-03-06", status: "Done", submittedBy: "Jane Smith", receivedFile: "orders.pdf" }
    ]);

    const sortedQuotations = useMemo(() => {
        return [...quotations].sort((a, b) => {
            let comparison = 0;
            for (let criterion of sortCriteria) {
                if (comparison !== 0) break;
    
                if (criterion === "date") {
                    comparison = new Date(a.dateCreated) - new Date(b.dateCreated);
                } else if (criterion === "status") {
                    comparison = a.status.localeCompare(b.status);
                } else if (criterion === "clientName") {
                    comparison = a.clientName.localeCompare(b.clientName);
                } else if (criterion === "description") {
                    comparison = a.description.localeCompare(b.description);
                } else if (criterion === "id") {
                    comparison = a.id - b.id;
                }
            }
            return comparison;
        });
    }, [quotations, sortCriteria]);

    const handleSortChange = (criterion) => {
        setSortCriteria(prev => {
            if (prev.includes(criterion)) {
                return prev.filter(c => c !== criterion);
            }
            return [...prev, criterion];
        });
    }; 

    const handleConvertToOrder = () => {
        if (selectedQuotation) {
            setOrders([...orders, selectedQuotation]);
            setHistory([...history, { id: Date.now(), description: `User converted File #${selectedQuotation.id} to Order`, date: new Date().toLocaleString() }]);
            setQuotations(quotations.filter(q => q.id !== selectedQuotation.id));
            alert("Quotation Ordered");
            setIsConvertModalOpen(false);
        }
    };

    const columns = [
        { accessorKey: "id", header: "No.", size: 2 },
        { accessorKey: "description", header: "Description", size: 800 },
        { accessorKey: "file", header: "Quotation File", size: 400,
            cell: ({ row }) => <a href={`/${row.original.file}`} target="_blank" rel="noopener noreferrer">View File</a>
        },
        { accessorKey: "date", header: "Date Submitted", size: 400 },
        { accessorKey: "status", header: "Status", size: 400 },
        { accessorKey: "submittedBy", header: "Submitted By", size: 400 },
        { accessorKey: "receivedFile", header: "Quoted File", size: 400,
            cell: ({ row }) => <a href={`/${row.original.file}`} target="_blank" rel="noopener noreferrer">View File</a>
        }
    ];

    const table = useReactTable({
        columns,
        data: activeTab === "quotations" ? sortedQuotations : activeTab === "archives" ? archives : history,
        columnResizeMode: 'onChange',
        getCoreRowModel: getCoreRowModel(),
    });

    const [file, setFile] = useState(null);
    const [description, setDescription] = useState("");

    const handleFileChange = (e) => setFile(e.target.files[0]);
    const handleDescriptionChange = (e) => setDescription(e.target.value);

    const handleSubmit = () => {
        if (!description || !file || !submittedBy) {
            alert("Please fill in all fields before submitting.");
            return;
        }
        const newQuotation = {
            id: quotations.length + 1, // Auto-increment ID
            description: description,
            file: file.name, // Store file name
            date: new Date().toLocaleString(), // Current date
            status: "Pending",
            submittedBy: submittedBy, // Replace with actual user later
            receivedFile: file.name, // Store received file name
        };
    
        setQuotations([...quotations, newQuotation]);
        setHistory([
            ...history,
            {
                id: Date.now(),
                description: `User ${submittedBy} submitted Quotation #${newQuotation.id}`,
                date: new Date().toLocaleString(),
            },
        ]);
    
        alert("Quotation submitted successfully!");
    
        // Reset form fields
        setDescription("");
        setFile(null);
        setSubmittedBy("");
        closeModal();
    };

    return (
        <div className="quotations-page">
            <Navbar type="logged" />
            <motion.div  initial="initial" animate="animate" exit="exit" variants={pageVariants} className="content">
                
                <div className="tabs">
                    <button className={`tab-icon-q ${activeTab === "quotations" ? "active" : ""}`} onClick={() => {hideTooltip(); setActiveTab("quotations")}}
                        onMouseEnter={(e) => activeTab !== "quotations" && showTooltip(e, "Quotation List")}
                        onMouseLeave={hideTooltip}>
                        <img className="icown" src={Quote} alt="Quote File Icon" />
                    </button>
                    <button className={`tab-icon ${activeTab === "archives" ? "active" : ""}`} onClick={() => {hideTooltip(); setActiveTab("archives")}}
                        onMouseEnter={(e) => activeTab !== "archives" && showTooltip(e, "Archives")}
                        onMouseLeave={hideTooltip}>
                        <Archive className="icown" size={20} />
                    </button>
                    <button className={`tab-icon ${activeTab === "history" ? "active" : ""}`} onClick={() => {hideTooltip();setActiveTab("history")}}
                        onMouseEnter={(e) => activeTab !== "history" && showTooltip(e, "History")}
                        onMouseLeave={hideTooltip}>
                        <History className="icown" size={20} />
                    </button>
                    <div className="tabs-2"><div className="divider"></div>
                        <button className="tab-icon-add" onClick={() => setIsAddModalOpen(true)}
                            onMouseEnter={(e) => {hideTooltip(); showTooltip(e, "Add Quotation")}}
                            onMouseLeave={hideTooltip}>
                            <FilePlus className="icown" size={20} />
                        </button>
                    </div>
                    </div>

                {/* Tooltip */}
                {tooltip.visible && (
                    <div className="tooltip2" style={{ left: `${tooltip.left}px`, top: `${tooltip.top}px` }}>
                        {tooltip.text}
                    </div>
                )}
                
                {activeTab !== "history" && (
                <div className="right-part">
                <div className="dropdown">
                    <button className="filter-btn">
                        SORT BY <Filter strokeWidth={3} size={15} />
                    </button>
                    <div className="dropdown-content">
                        {["date", "status", "description", "id"].map((criterion) => (
                            <button
                                key={criterion}
                                onClick={() => handleSortChange(criterion)}
                                className={sortCriteria.includes(criterion) ? "active" : ""}
                            >
                                {criterion.charAt(0).toUpperCase() + criterion.slice(1)}
                                {sortCriteria.includes(criterion) && <Check className="check" size={13} />}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="quotation-table-wrapper">
                    <table className="quotation-table">
                        <thead>
                            {table.getHeaderGroups().map(headerGroup => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map(header => (
                                        <th key={header.id} style={{ width: header.getSize() }}>
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                            <div
                                                className="resizer"
                                                onMouseDown={header.getResizeHandler()}
                                                style={{ cursor: "ew-resize" }}
                                            />
                                        </th>
                                    ))}
                                    {activeTab !== "history" && <th>Action</th>}
                                </tr>
                            ))}
                        </thead>
                        <tbody>
                            {table.getRowModel().rows.length === 0 ? (
                                    <tr>
                                        <td colSpan={columns.length + 1} className="no-data-message">
                                            No {activeTab === "orders" ? "orders" :
                                                activeTab === "archives" ? "archived files" :
                                                "records"} available.
                                        </td>
                                    </tr>
                                ) : (table.getRowModel().rows.map(row => (
                                <tr key={row.id}>
                                    {row.getVisibleCells().map(cell => (
                                        <td key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                    {activeTab === "quotations" && (
                                    <td className="action-cell">
                                        <button className="convert-btn" 
                                            onClick={() => openConvertModal(row.original)}
                                            onMouseEnter={(e) => showTooltip(e, "Convert to Order")}
                                            onMouseLeave={hideTooltip}
                                            >
                                            <Forward strokeWidth={3} size={15} />
                                        </button><div className="divider-2"></div>
                                        <button className="archive-btn" onClick={() => {hideTooltip(); handleArchive(row.original)}}
                                            onMouseEnter={(e) => showTooltip(e, "Archive File")}
                                            onMouseLeave={hideTooltip}
                                        >
                                            <FolderDown size={20} />
                                        </button>
                                    </td>
                                    )}
                                    {activeTab === "archives" && (
                                    <td>
                                        <button className="unarchive-btn" onClick={() => {hideTooltip(); handleUnarchive(row.original)}}
                                            onMouseEnter={(e) => showTooltip(e, "Unarchive File")}
                                            onMouseLeave={hideTooltip}
                                        >
                                            <FolderUp size={20} />
                                        </button>
                                    </td>
                                    )}
                                </tr>
                            )))}
                        </tbody>
                    </table>
                </div>
                </div>
                )}
                {activeTab === "history" && (
                    <div className="history-container">
                        <table className="history-table">
                            <thead>
                                <tr>
                                    <th>ACTIVITY HISTORY</th>
                                </tr>
                            </thead>
                            <tbody>
                                {history.length === 0 ? (
                                    <tr><td className="no-data-message">No history available.</td></tr>
                                ) : (
                                    history.map((entry) => (
                                        <tr key={entry.id}>
                                            <td>{entry.description} - <span className="timestamp">{entry.date}</span></td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            <ChatHead/>
            </motion.div>
            {showSplash && <SplashScreen image={splashQuote} />}

            {isAddModalOpen && (
            <div className="modal-overlay">
                <div className="modal-box">
                    <h2><b><center>Add New Quotation</center></b></h2>

                    <label>Description:</label>
                    <input
                        value={description}
                        onChange={handleDescriptionChange}
                        placeholder="Enter description"
                    ></input>
                    <label>Submitted By:</label> {/* ✅ New Input Field */}
                    <input
                        type="text"
                        value={submittedBy}
                        onChange={(e) => setSubmittedBy(e.target.value)}
                        placeholder="Enter your name"
                    />

                    <label>Upload Quotation (PDF):</label>
                    <input type="file" accept="application/pdf" onChange={handleFileChange} />

                    <div className="modal-buttons">
                        <button className="submit-btn" onClick={handleSubmit}>Submit</button>
                        <button className="cancel-btn" onClick={closeModal}>Cancel</button>
                    </div>
                </div>
            </div>
            )}
            {isConvertModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <h2>Convert Quotation to Order?</h2>
                        <p>Are you sure you want to proceed?</p>
                        <button className="submit-btn" onClick={handleConvertToOrder}>Proceed</button>
                        <button className="cancel-btn" onClick={() => setIsConvertModalOpen(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Quotations;