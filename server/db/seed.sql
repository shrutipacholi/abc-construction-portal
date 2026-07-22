-- Seed data (at least 3–4 rows per table)
USE abc_construction;

-- Passwords:
-- client@test.com     -> secret1
-- ananya@example.com  -> Demo@123
-- rohan@example.com   -> Client@123
-- meera@example.com   -> Build@123

INSERT INTO users (id, name, email, phone, company, role, password_hash, created_at) VALUES
('u-admin-000', 'Site Admin', 'admin@abcconstruction.com', '9000000000', 'ABC Construction', 'admin',
 '$2b$08$yZi/f6XIRBvYxc7.0CimWukhHUJgyg2ybb9ixBmm1QfO/H7EBmLku', '2025-09-01 08:00:00'),
('u-demo-001', 'Demo Client', 'client@test.com', '9999999999', 'Demo Corp', 'client',
 '$2b$08$VRE16Lo42WC4O1u2LiiegOc4wVsPfDmWXWB.copgYc8WE71wLB0fq', '2025-10-01 09:00:00'),
('u-ananya-002', 'Ananya Sharma', 'ananya@example.com', '9876501234', 'Sharma Residences', 'client',
 '$2b$08$yeFl1OXRrgsCaroEgosCgOBEkRQHTNyxb5R43HK69Y.okaw3En2.m', '2025-11-12 11:20:00'),
('u-rohan-003', 'Rohan Mehta', 'rohan@example.com', '9811122233', 'Mehta Commercial LLP', 'client',
 '$2b$08$gdxVw3pGHemb87NMbj/uSuEDP8ahp05NGkxuUTpMqu2jzMI0upSOq', '2025-12-05 14:45:00'),
('u-meera-004', 'Meera Iyer', 'meera@example.com', '9822233344', 'Iyer Infra Pvt Ltd', 'client',
 '$2b$08$WrZ/rz/WwXPaoer/x7eLY.RbKnJdZ0RS5SZ/WsINtKDUt3z0OWfva', '2026-01-18 10:10:00');

INSERT INTO quote_requests (id, user_id, status, company, note, submitted_at) VALUES
('q-001', 'u-demo-001', 'Assigned', 'Demo Corp', 'Active residential project assigned to your account.', '2025-10-20 10:00:00'),
('q-002', 'u-ananya-002', 'Assigned', 'Sharma Residences', 'Luxury villa design & build package in progress.', '2025-11-12 11:25:00'),
('q-003', 'u-rohan-003', 'In Review', 'Mehta Commercial LLP', 'Corporate office renovation proposal under review.', '2025-12-05 15:00:00'),
('q-004', 'u-meera-004', 'Submitted', 'Iyer Infra Pvt Ltd', 'Awaiting site inspection for warehouse expansion.', '2026-01-18 10:15:00');

INSERT INTO projects (id, user_id, name, type, status, progress, location, manager, start_date, due_date) VALUES
('p-demo-01', 'u-demo-001', 'Luxury Villa — Palm Estate', 'Residential', 'In Progress', 68, 'Pune', 'Rahul Mehta', '2025-11-01', '2026-09-30'),
('p-demo-02', 'u-demo-001', 'Staff Quarters Block B', 'Residential', 'Planning', 18, 'Pune', 'Priya Sharma', '2026-03-01', '2026-12-15'),
('p-ananya-01', 'u-ananya-002', 'Lakeview Luxury Villa', 'Residential', 'In Progress', 45, 'Bengaluru', 'Kavita Nair', '2025-12-01', '2026-10-31'),
('p-ananya-02', 'u-ananya-002', 'Landscape & Pool Annex', 'Interior', 'Planning', 12, 'Bengaluru', 'Kavita Nair', '2026-04-01', '2026-11-30'),
('p-rohan-01', 'u-rohan-003', 'Corporate Office Tower Fit-out', 'Commercial', 'In Progress', 33, 'Mumbai', 'Amit Desai', '2026-01-10', '2026-12-20'),
('p-meera-01', 'u-meera-004', 'Industrial Warehouse Expansion', 'Industrial', 'Planning', 8, 'Chennai', 'Suresh Rao', '2026-02-01', '2027-01-15');

INSERT INTO milestones (id, user_id, project_id, title, due_date, is_done) VALUES
('m-001', 'u-demo-001', 'p-demo-01', 'Foundation Complete', '2026-01-20', 1),
('m-002', 'u-demo-001', 'p-demo-01', 'Structure Framing', '2026-04-15', 1),
('m-003', 'u-demo-001', 'p-demo-01', 'Interior Finishing', '2026-07-30', 0),
('m-004', 'u-demo-001', 'p-demo-01', 'Final Handover', '2026-09-30', 0),
('m-005', 'u-ananya-002', 'p-ananya-01', 'Soil Testing & Survey', '2025-12-20', 1),
('m-006', 'u-ananya-002', 'p-ananya-01', 'Plinth Beam Casting', '2026-02-28', 1),
('m-007', 'u-ananya-002', 'p-ananya-01', 'Roof Slab', '2026-06-15', 0),
('m-008', 'u-rohan-003', 'p-rohan-01', 'MEP Design Freeze', '2026-02-10', 1),
('m-009', 'u-rohan-003', 'p-rohan-01', 'Interior Partitioning', '2026-05-30', 0),
('m-010', 'u-meera-004', 'p-meera-01', 'Site Inspection', '2026-02-20', 0),
('m-011', 'u-meera-004', 'p-meera-01', 'Structural Drawings Approval', '2026-03-25', 0);

INSERT INTO payments (id, user_id, project_id, label, amount, status, paid_on) VALUES
('pay-001', 'u-demo-001', 'p-demo-01', 'Mobilization Advance', 850000.00, 'Paid', '2025-11-05'),
('pay-002', 'u-demo-001', 'p-demo-01', 'Milestone 2 — Structure', 1200000.00, 'Paid', '2026-04-18'),
('pay-003', 'u-demo-001', 'p-demo-01', 'Milestone 3 — Interiors', 950000.00, 'Due', '2026-08-01'),
('pay-004', 'u-ananya-002', 'p-ananya-01', 'Design Retainer', 250000.00, 'Paid', '2025-12-05'),
('pay-005', 'u-ananya-002', 'p-ananya-01', 'Foundation Milestone', 780000.00, 'Paid', '2026-03-01'),
('pay-006', 'u-rohan-003', 'p-rohan-01', 'Fit-out Mobilization', 1100000.00, 'Paid', '2026-01-15'),
('pay-007', 'u-rohan-003', 'p-rohan-01', 'Phase-1 Interior Billing', 640000.00, 'Due', '2026-06-01'),
('pay-008', 'u-meera-004', 'p-meera-01', 'Survey & Estimate Fee', 95000.00, 'Due', '2026-02-28');

INSERT INTO documents (id, user_id, project_id, name, doc_type, uploaded_on) VALUES
('d-001', 'u-demo-001', 'p-demo-01', 'Contract Agreement.pdf', 'Contract', '2025-10-28'),
('d-002', 'u-demo-001', 'p-demo-01', 'Architectural Drawings.zip', 'Drawings', '2025-11-12'),
('d-003', 'u-demo-001', 'p-demo-01', 'Quality Certificate — Foundation.pdf', 'Certificate', '2026-01-22'),
('d-004', 'u-ananya-002', 'p-ananya-01', 'Villa Contract.pdf', 'Contract', '2025-11-20'),
('d-005', 'u-ananya-002', 'p-ananya-01', 'Floor Plans Rev-B.pdf', 'Drawings', '2025-12-08'),
('d-006', 'u-rohan-003', 'p-rohan-01', 'Fit-out Agreement.pdf', 'Contract', '2026-01-08'),
('d-007', 'u-rohan-003', 'p-rohan-01', 'MEP Layouts.pdf', 'Drawings', '2026-02-01'),
('d-008', 'u-meera-004', 'p-meera-01', 'Warehouse Enquiry Brief.pdf', 'Contract', '2026-01-19');

INSERT INTO messages (id, user_id, sender_name, sender_role, body, sent_at) VALUES
('msg-001', 'u-demo-001', 'Rahul Mehta', 'Project Manager', 'Foundation inspection passed. Next week we begin framing.', '2026-01-21 10:30:00'),
('msg-002', 'u-demo-001', 'You', 'Client', 'Thanks. Please share photos of the site progress.', '2026-01-21 14:05:00'),
('msg-003', 'u-demo-001', 'Rahul Mehta', 'Project Manager', 'Photos uploaded to your documents folder.', '2026-01-22 09:15:00'),
('msg-004', 'u-ananya-002', 'Kavita Nair', 'Project Manager', 'Plinth beam casting completed ahead of schedule.', '2026-03-02 11:00:00'),
('msg-005', 'u-ananya-002', 'You', 'Client', 'Great — please confirm the next site visit date.', '2026-03-02 16:20:00'),
('msg-006', 'u-rohan-003', 'Amit Desai', 'Project Manager', 'MEP drawings are ready for your review.', '2026-02-12 13:40:00'),
('msg-007', 'u-meera-004', 'ABC Construction', 'Support', 'Welcome Meera. Your warehouse enquiry has been logged.', '2026-01-18 10:20:00'),
('msg-008', 'u-meera-004', 'Suresh Rao', 'Project Manager', 'We will schedule a Chennai site inspection next week.', '2026-01-20 17:05:00');

INSERT INTO notifications (id, user_id, text, created_label, created_at) VALUES
('n-001', 'u-demo-001', 'Milestone “Structure Framing” marked complete', '2 days ago', '2026-04-16 09:00:00'),
('n-002', 'u-demo-001', 'New payment invoice uploaded', '1 week ago', '2026-04-10 12:00:00'),
('n-003', 'u-demo-001', 'Quality certificate available for download', '3 weeks ago', '2026-01-22 10:00:00'),
('n-004', 'u-ananya-002', 'Foundation milestone payment recorded as Paid', '1 week ago', '2026-03-02 08:30:00'),
('n-005', 'u-ananya-002', 'Updated floor plans uploaded', '2 weeks ago', '2026-02-20 15:00:00'),
('n-006', 'u-rohan-003', 'MEP design freeze completed', '3 days ago', '2026-02-11 11:10:00'),
('n-007', 'u-rohan-003', 'Phase-1 interior billing is due', 'Yesterday', '2026-06-01 09:00:00'),
('n-008', 'u-meera-004', 'Quote request submitted successfully', 'Just now', '2026-01-18 10:16:00'),
('n-009', 'u-meera-004', 'Project manager assigned: Suresh Rao', '2 days ago', '2026-01-20 17:00:00');
